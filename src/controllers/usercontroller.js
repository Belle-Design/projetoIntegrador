const {v4: uuid} = require('uuid');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { usuarioModel, reformaModel, especialidadeModel, fotoReformaModel } = require('../database');
const ReformaModel = require('../database/models/ReformaModel');
const { Op } = require("sequelize");


const usercontroller = {
    
    cadastro: async (request, response) => {

        const especialidade = await especialidadeModel.findAll();

        return response.render ('cadastro', {especialidade} );
        },


    saveCadastro: async (request, response) => {


        const { nome, sobrenome, senha, confirmarsenha, email, telefone, dataNascimento, especialidadesId, receberSMS, receberEmail } = request.body;

        const senhaHash = await bcrypt.hash(senha, 8)
        
        const fotoAvatar = request.file?.filename || 'avatarDefault.png'
       
        await usuarioModel.create({ nome, sobrenome, email, senha:senhaHash, confirmarsenha, telefone, dataNascimento, avatar:fotoAvatar, especialidadesId, receberSMS, receberEmail });

        response.redirect("/user/login");
        
    },
    
    entrar: async (request, response) => {
        return response.render ('login');
    },
    
    
    
    logar: async (request, response)=>{
        const { email, senha} = request.body;

        const cadastroFound = await usuarioModel.findOne({
            where:{
                email: email, 
            },

        });

        if(!cadastroFound){
            return response.status(401).render('login', {
                error: 'Usuário ou senha incorretos'
            });
        }
        const issenhaCorrect = await bcrypt.compare(senha, cadastroFound.senha);

        if (!issenhaCorrect) {
            return response.status(401).render('login',{
                error: 'Usuário ou senha incorretos'
            });
        }


        delete cadastroFound.senha;
        delete cadastroFound.confirmarsenha;
       
        request.session.userLogged = cadastroFound;
               
        return response.redirect('/user/areacliente');  
    },
    areacliente: async(request, response)=>{
    
        return response.render('areacliente', {userLogged: request.session.userLogged});
    },
    projetos: async(request, response)=>{
        
        // const especialidade = await especialidadeModel.findAll();
        // return response.render ('cadastro', {especialidade} )

        let projeto = await reformaModel.findAll(
            {
                raw: true,
                //Other parameters
                where: {
                    usuariosId: request.session.userLogged.id
                },
                attributes: ['id', 'usuariosId', 'localReforma', 'comprimento', 'largura', 'altura'],
            }
          );


        //   SELECT * FROM usuarios 
        //   INNER JOIN reformas  ON usuarios.id  = reformas.usuariosId 
        //   INNER JOIN fotosreformas ON reformas.id = fotosreformas.reformasId 
        //   where usuariosId = 2
        // console.log(projeto)
        // let numeros = [... projeto.forEach(element => {
        //     element.id
        // })]
        let testeNum = []
        for(let i = 0; i < projeto.length; i++){
            testeNum.push(projeto[i].id)
        }


        const fotos =   await fotoReformaModel.findAll({
            raw: true,
            where: {
                reformasId: {
                  [Op.or]: testeNum
                }
            },
            attributes: ['fotos'],
    }) ;
        for(j = 0; j < projeto.length; j++) {
            projeto[j]['foto'] = fotos[j].fotos
        }

        console.log(testeNum)
        console.log(fotos)
        console.log(projeto)

        return response.render('projetos', {userLogged: request.session.userLogged,
        projeto, fotos});
    },

    projetoShow: async(request, response)=>{
        const id = request.params.id;
        console.log(id)
        const dados = await reformaModel.findOne({
            raw: true,
            //Other parameters
            where: {
                id: id
            },
                attributes: ['id', 'usuariosId', 'localReforma', 'comprimento', 'largura', 'altura', 'dataReuniao'],
        })
        console.log(dados)

        const fotos =   await fotoReformaModel.findAll({
            raw: true,
            where: {
                reformasId: id
            },
            attributes: ['fotos'],
        })

        const item = dados.localReforma.split('_').join("")
        let data = dados.dataReuniao.toJSON().toString().slice(0,16)
        console.log(data)

        return response.render('edicaoProjeto', {userLogged: request.session.userLogged,
        dados, fotos, item, data});
    },

    
    novoprojeto: async(request, response)=>{
    
        return response.render('novoProjeto', {userLogged: request.session.userLogged});
    },


    reformaInfo: async (request, response) => {

        const usuariosId = request.session.userLogged.id;
        

        const {localReforma, comprimento, largura ,altura, dataReuniao } = request.body;
        
        const reforma = await reformaModel.create({ usuariosId, localReforma, comprimento, largura, altura, dataReuniao });
        
        console.log(reforma, request.files);
        await Promise.all(request.files.map((file)=>{
            
            return fotoReformaModel.create({reformasId:reforma.id, fotos:file.filename});
        }))

        
        const cadastroFound = await usuarioModel.findOne({
            where:{
                email: request.body.email_usuario
            }
        });


        return response.render('areacliente', {userLogged: cadastroFound});

    },

    logout: (request, response) => {
        request.session.destroy();
        return response.redirect('/');
    }
}


module.exports = usercontroller;