const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { usuarioModel, reformaModel, especialidadeModel } = require('../database');




const usercontroller = {
    
    cadastro: async (request, response) => {

        const especialidade = await especialidadeModel.findAll();

        return response.render ('cadastro', {especialidade} );
        },


    saveCadastro: async (request, response) => {

        const { nome, sobrenome, email, senha, confirmarsenha, telefone, dataNascimento, avatar, especialidadesId, receberSMS, receberEmail } = request.body;
        
        // const senhaHash = bcrypt.hashSync(senha);
        // const confirmarsenhaHash = bcrypt.hashSync(confirmarsenha);
       
        let fotoAvatar = request.file
        if (fotoAvatar !== undefined) {
            fotoAvatar = fotoAvatar.filename
        }
        else {
            fotoAvatar = 'avatarDefault.png'
        }

        await usuarioModel.create({ nome, sobrenome, email, senha, confirmarsenha, telefone, dataNascimento, avatar, especialidadesId, receberSMS, receberEmail });

        response.redirect("/user/login");
        
    },

    
    entrar: async (request, response) => {
        return response.render ('login');
    },
    
    
    logar: async (request, response)=>{
        const { email, senha} = request.body;

        const cadastro = await usuarioModel.findAll();

        const cadastroFound = cadastro.find(cadastro => cadastro.email === email && cadastro.senha === senha);

        if(!cadastroFound){
            return response.status(401).render('login', {
                error: 'Usuário ou senha incorretos'
            });
        }
        //const issenhaCorrect = bcrypt.compareSync(senha, cadastroFound.senha);

        // if (!issenhaCorrect) {
        //     return response.status(401).render('login',{
        //         error: 'Usuário ou senha incorretos'
        //     });
        // }

       

        delete cadastroFound.senha;
        delete cadastroFound.confirmarsenha;
       
        request.session.userLogged = cadastroFound;
               
        return response.redirect('/user/areacliente');  
    },

    
    areacliente: async(request, response)=>{
        return response.render('areacliente', {userLogged: request.session.userLogged});
    },


    reformaInfo: async (request, response) => {

        const { usuarioId, localReforma, comprimento, largura, altura, fotos, dataReuniao } = request.body;
        
        const cadastro = await usuarioModel.findAll();
        
        const cadastroFound = cadastro.find((cadastro) => cadastro.email === request.body.email_usuario);
    
        await reformaModel.create({ usuarioId, localReforma, comprimento, largura, altura, fotos, dataReuniao });

        return response.render('areacliente', {userLogged: cadastroFound});
    },

    logout: (request, response) => {
        request.session.destroy();
        return response.redirect('/');
    }
}


module.exports = usercontroller;