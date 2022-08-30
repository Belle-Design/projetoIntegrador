const {v4: uuid} = require('uuid');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { usuarioModel, reformaModel, especialidadeModel, fotoReformaModel } = require('../database');
const ReformaModel = require('../database/models/ReformaModel');

const usercontroller = {
    
    cadastro: async (request, response) => {

        const especialidade = await especialidadeModel.findAll();

        return response.render ('cadastro', {especialidade} );
        },


    saveCadastro: async (request, response) => {


        const { nome, sobrenome, senha, confirmarsenha, email, telefone, dataNascimento, avatar, especialidadesId, receberSMS, receberEmail } = request.body;

        const senhaHash = await bcrypt.hash(senha, 8)
        
        let fotoAvatar = request.file
        if (fotoAvatar !== undefined) {
            fotoAvatar = fotoAvatar.filename
        }
        else {
            fotoAvatar = 'avatarDefault.png'
        }

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


    reformaInfo: async (request, response) => {

        const usuariosId = request.session.userLogged.id;
        
        const reformasId = request.session.userLogged.id;

        const {localReforma, comprimento, largura, fotos ,altura, dataReuniao } = request.body;
        
        await reformaModel.create({ usuariosId, localReforma, comprimento, largura, altura, dataReuniao });
        
        await fotoReformaModel.create({reformasId, fotos});
        
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