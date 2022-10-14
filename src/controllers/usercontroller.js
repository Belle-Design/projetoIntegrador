const bcrypt = require("bcryptjs");
const {
  usuarioModel,
  reformaModel,
  especialidadeModel,
  fotoReformaModel,
} = require("../database");
const { format } = require("date-fns");


const usercontroller = {
  cadastro: async (request, response) => {
    const especialidade = await especialidadeModel.findAll();

    return response.render("cadastro", { especialidade });
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
      receberEmail,
    } = request.body;

    const senhaHash = await bcrypt.hash(senha, 8);

    const fotoAvatar = request.file?.filename || "avatarDefault.png";

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
      receberEmail,
    });

    response.redirect("/user/login");
  },
  updateShow: async (request, response) => {
    const { id } = request.params;
    const editCadastro = await usuarioModel.findByPk(id);

    const selectDataNascimento = format(
      new Date(editCadastro.dataNascimento),
      "yyyy-MM-dd"
    );

    const especialidade = await especialidadeModel.findAll();
    const especialidadeCadastrada = await especialidadeModel.findByPk(
      editCadastro.especialidadesId
    );

    response.render("cadastroUpdate", {
      editCadastro: {
        ...editCadastro.toJSON(),
        dataNascimento: selectDataNascimento,
      },
      especialidade,
      especialidadeCadastrada,
    });
  },
  update: (request, response) => {
    const {
      nome,
      sobrenome,
      email,
      senhaHash,
      confirmarsenha,
      cpf,
      telefone,
      dataNascimento,
      fotoAvatar,
      especialidadesId,
      receberSMS,
      receberEmail,
    } = request.body;
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
        receberEmail,
      },
      { where: { id } }
    );
    response.redirect("/user/areacliente");
  },
  deleteShow: async (request, response) => {
    const { id } = request.params;
    const deleteUser = await usuarioModel.findByPk(id);

    response.render("cadastroDelete", { deleteUser });
  },
  delete: async (request, response) => {
    const { id } = request.params;

    const reformas = await reformaModel.findAll({
      where: {
        usuariosId: id
      },
      attributes:['id']
    })
    const reformasId = reformas.map((reforma)=>reforma.id)

    await fotoReformaModel.destroy({
      where: {
        reformasId
      },
      force: true
    })
    await reformaModel.destroy({
      where: {
        usuariosId: id
      },
      force: true
    });
    await usuarioModel.destroy({
      where: {
        id
      },
      force: true
    });
    response.redirect("/index");
  },
  entrar: async (request, response) => {
    return response.render("login");
  },
  logar: async (request, response) => {
    const { email, senha } = request.body;

    const cadastroFound = await usuarioModel.findOne({
      where: {
        email,
      },
    });

    if (!cadastroFound) {
      return response.status(401).render("login", {
        error: "Usuário ou senha incorretos",
      });
    }

    const issenhaCorrect = await bcrypt.compare(senha, cadastroFound.senha);

    if (!issenhaCorrect) {
      return response.status(401).render("login", {
        error: "Usuário ou senha incorretos",
      });
    }

    delete cadastroFound.senha;
    delete cadastroFound.confirmarsenha;

    request.session.userLogged = cadastroFound;

    return response.redirect("/user/areacliente");
  },
  areacliente: async (request, response) => {
    return response.render("areacliente", {
      userLogged: request.session.userLogged,
    });
  },
  projetos: async (request, response) => {
    const projetos = await reformaModel.findAll({
      where: {
        usuariosId: request.session.userLogged.id,
      },
      attributes: [
        "id",
        "usuariosId",
        "localReforma",
        "comprimento",
        "largura",
        "altura",
      ],
      include: ["fotosReformas"],
    });

    return response.render("projetos", {
      userLogged: request.session.userLogged,
      projetos,
    });
  },
  projetoShow: async (request, response) => {
    const id = request.params.id;

    const dados = await reformaModel.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "usuariosId",
        "localReforma",
        "comprimento",
        "largura",
        "altura",
        "cep",
        "rua",
        "complemento",
        "bairro",
        "cidade",
        "uf",
        "dataReuniao",
      ],
      include: ["fotosReformas"],
    });

    const selectData = format(new Date(dados.dataReuniao), 'yyyy-MM-dd');
    const item = dados.localReforma.split("_").join("");
  
    return response.render("edicaoProjeto", {
      userLogged: request.session.userLogged,
      dados:{...dados.toJSON(), dataReuniao: selectData},
      fotos: dados.fotosReformas,
      item,
    });
  },
  projetoUpdate: async (request, response) => {
    const {
      localReforma,
      comprimento,
      largura,
      altura,
      dataReuniao,
    } = request.body;
    const { id } = request.params;

    await reformaModel.update(
      {
        localReforma,
        comprimento,
        largura,
        altura,
        dataReuniao,
      },
      { where: { id } }
    );
    
    response.redirect("/user/areacliente");
  },
  projetoDeleteShow: async (request, response) => {
    const { id } = request.params;
    const deleteProjeto = await reformaModel.findByPk(id);

    response.render("deleteProjeto", { deleteProjeto });
  },
  projetoDelete: async (request, response) => {
    const { id } = request.params;
  
    await fotoReformaModel.destroy({
      where: {
        reformasId: id
      },
      force: true
    })
    await reformaModel.destroy({
      where: {
        id: id
      },
      force: true
    });
    response.redirect("/user/areacliente");
  },
  novoprojeto: async (request, response) => {
    return response.render("novoProjeto", {
      userLogged: request.session.userLogged,
    });
  
  },

  paginaDelecaoImagem: async (request, response) => {
    const id = request.params.id
    const dados = await fotoReformaModel.findOne({
      where: {
        id: id,
      },
      });
    response.render("deleteFoto", { id, dados })
  },

  delecaoImagem: async (request, response) => {
    const id = request.params.id
    const dados = await fotoReformaModel.findOne({
      where: {
        id: id,
      },
    });
    await fotoReformaModel.destroy({where: {id: id}, force: true })
    return response.redirect(`/user/projetos/${dados.reformasId}`)
  },


  reformaInfo: async (request, response) => {
    const usuariosId = request.session.userLogged.id;
    const {
      localReforma,
      comprimento,
      largura,
      altura,
      cep,
      rua,
      complemento,
      bairro,
      cidade,
      uf,
      dataReuniao,
    } = request.body;

    const reforma = await reformaModel.create({
      usuariosId,
      localReforma,
      comprimento,
      largura,
      altura,
      cep,
      rua,
      complemento,
      bairro,
      cidade,
      uf,
      dataReuniao,
    });

    await Promise.all(
      request.files.map((file) =>
        fotoReformaModel.create({
          reformasId: reforma.id,
          fotos: file.filename,
        })
      )
    );

    const cadastroFound = await usuarioModel.findOne({
      where: {
        email: request.body.email_usuario,
      },
    });

    return response.render("areacliente", { userLogged: cadastroFound });
  },
  logout: (request, response) => {
    request.session.destroy();
    return response.redirect("/");
  },
};

module.exports = usercontroller;
