const bcrypt = require('bcryptjs');
const { usuarioModel, reformaModel, especialidadeModel, fotoReformaModel } = require('../database');
const { Op } = require("sequelize");
const { response, request } = require('express');
const usercontroller = {
  cadastro: async (request, response) => {
    const especialidade = await especialidadeModel.findAll();

    return response.render('cadastro', { especialidade });
  },
  saveCadastro: async (request, response) => {
    const {
      nome,
      sobrenome,
      senha,
      confirmarsenha,
      cpf,
      email,
      telefone,
      dataNascimento,
      especialidadesId,
      receberSMS,
      receberEmail
    } = request.body;

    const senhaHash = await bcrypt.hash(senha, 8);

    const fotoAvatar = request.file?.filename || 'avatarDefault.png'

    await usuarioModel.create({
      nome,
      sobrenome,
      email,
      senha: senhaHash,
      confirmarsenha,
      cpf,
      telefone,
      dataNascimento,
      avatar: fotoAvatar,
      especialidadesId,
      receberSMS,
      receberEmail
    });

    response.redirect("/user/login");
  },
  updateShow: async (request, response)=>{
    const { id } = request.params;
    const editCadastro = await usuarioModel.findByPk(id);
    const especialidade = await especialidadeModel.findAll();

    response.render('cadastroUpdate', {
      editCadastro, especialidade
    });
  },
  update:(request, response)=>{
    const { nome,
      sobrenome,
      email,
      senha: senhaHash,
      confirmarsenha,
      cpf,
      telefone,
      dataNascimento,
      avatar: fotoAvatar,
      especialidadesId,
      receberSMS,
      receberEmail } = request.body;
    const { id } = request.params;

    usuarioModel.update(
    {
      nome,
      sobrenome,
      email,
      senha: senhaHash,
      confirmarsenha,
      cpf,
      telefone,
      dataNascimento,
      avatar: fotoAvatar,
      especialidadesId,
      receberSMS,
      receberEmail
    },
    {where: {id}}
    );
    response.redirect('/user/areacliente');
  },
  deleteShow: async (request, response)=>{
    const { id } =  request.params;
    const deleteUser = await usuarioModel.findByPk(id);

    response.render('cadastroDelete',{deleteUser})
  },
  delete: async (request, response)=>{
    const { id } = request.params;

    await usuarioModel.destroy({where: {id}, force: true});
    await reformaModel.destroy({where: {id}, force: true});
    await fotoReformaModel.destroy({where: {id}, force: true});


    response.redirect('/index');
  },
  entrar: async (request, response) => {
    return response.render('login');
  },
  logar: async (request, response) => {
    const { email, senha } = request.body;

    const cadastroFound = await usuarioModel.findOne({
      where: {
        email,
      },
    });

    if (!cadastroFound) {
      return response.status(401).render('login', {
        error: 'Usuário ou senha incorretos'
      });
    }

    const issenhaCorrect = await bcrypt.compare(senha, cadastroFound.senha);

    if (!issenhaCorrect) {
      return response.status(401).render('login', {
        error: 'Usuário ou senha incorretos'
      });
    }


    delete cadastroFound.senha;
    delete cadastroFound.confirmarsenha;

    request.session.userLogged = cadastroFound;

    return response.redirect('/user/areacliente');
  },
  areacliente: async (request, response) => {
    return response.render(
      'areacliente', { userLogged: request.session.userLogged }
    );
  },
  projetos: async(request, response)=>{
        const projetos = await reformaModel.findAll(
            {
                where: {
                    usuariosId: request.session.userLogged.id
                },
                attributes: ['id', 'usuariosId', 'localReforma', 'comprimento', 'largura', 'altura'], 
                include: ['fotosReformas']
            }
          );
      
        return response.render('projetos', {userLogged: request.session.userLogged,
        projetos});
    },
    projetoShow: async(request, response)=>{
        const id = request.params.id;
        const dados = await reformaModel.findOne({
            where: {
                id: id
            },
                attributes: ['id', 'usuariosId', 'localReforma', 'comprimento', 'largura', 'altura', 'dataReuniao'],
                include: ['fotosReformas']
        })
      
        const item = dados.localReforma.split('_').join("")
        let data = dados.dataReuniao.toString().slice(0,16)

        return response.render('edicaoProjeto', {userLogged: request.session.userLogged,
        dados, fotos:dados.fotosReformas, item, data});
    },
  novoprojeto: async (request, response) => {
    return response.render(
      'novoProjeto', { userLogged: request.session.userLogged }
    );
  },
  reformaInfo: async (request, response) => {
    const usuariosId = request.session.userLogged.id;
    const { localReforma, comprimento, largura, altura, dataReuniao } = request.body;

    const reforma = await reformaModel.create(
      { usuariosId, localReforma, comprimento, largura, altura, dataReuniao });

    await Promise.all(request.files.map((file) =>
      fotoReformaModel.create({ reformasId: reforma.id, fotos: file.filename })
    ))

    const cadastroFound = await usuarioModel.findOne({
      where: {
        email: request.body.email_usuario
      }
    });

    return response.render('areacliente', { userLogged: cadastroFound });
  },
  logout: (request, response) => {
    request.session.destroy();
    return response.redirect('/');
  }
}

module.exports = usercontroller;