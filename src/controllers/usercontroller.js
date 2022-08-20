const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { usuarioModel } = require('../database');
const { clienteModel } = require('../database');



const usercontroller = {
    
    cadastro: (request, response) => {
        return response.render ('cadastro');
        },


    saveCadastro: async (request, response) => {

        const { nome, sobrenome, email, senha, confirmarsenha, telefone, dataNascimento, avatar, receberSMS, receberEmail } = request.body;
        
       
        let fotoAvatar = request.file
        if (fotoAvatar !== undefined) {
            fotoAvatar = fotoAvatar.filename
        }
        else {
            fotoAvatar = 'avatarDefault.png'
        }

        await usuarioModel.create({ nome, sobrenome, email, senha, confirmarsenha, telefone, dataNascimento, avatar, receberSMS, receberEmail });

        response.redirect("/user/login");
        
    },

    
    entrar: (request, response) => {
        return response.render ('login');
    },
    
    
    logar: (request, response)=>{
        const { email, senha} = request.body;

        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));

        const cadastroFound = cadastro.find(cadastro => cadastro.email === email);

        if(!cadastroFound){
            return response.status(401).render('login', {
                error: 'Usuário ou senha incorretos'
            });
        }
        const issenhaCorrect = bcrypt.compareSync(senha, cadastroFound.senha);

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

    
    areacliente: (request, response)=>{
        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));   
        return response.render('areacliente', {userLogged: request.session.userLogged});
    },


    reformaInfo: (request, response) => {
        
        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));
        const reforma = JSON.parse(fs.readFileSync(fotosFilePath, 'utf-8'));
        
        const cadastroFound = cadastro.find((cadastro) => cadastro.email === request.body.email_usuario);

        
        const newReforma = {
            id: uuid(),
            id_cliente: cadastroFound.id,
            ...request.body,
            fotos: request.files,
        };
        

        reforma.push(newReforma);

        fs.writeFileSync(fotosFilePath, JSON.stringify(reforma, null, ''));

           
        return response.render('areacliente', {userLogged: cadastroFound});
    },

    logout: (request, response) => {
        request.session.destroy();
        return response.redirect('/');
    }
}


module.exports = usercontroller;