const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');
const bcrypt = require('bcryptjs');

const cadastroFilePath = path.join(__dirname, '..', 'data', 'cadastroDataBase.json');
const fotosFilePath = path.join(__dirname, '..', 'data', 'cadastroReforma.json');

const usercontroller = {
    
    cadastro: (request, response) => {
        return response.render ('cadastro');
        },


    saveCadastro:(request, response) => {
        const { senha , confirmarsenha} = request.body;

        const senhaHash = bcrypt.hashSync(senha);
        const confirmarsenhaHash = bcrypt.hashSync(confirmarsenha);

        /*let fotoAvatar = request.file.filename;
        
        if (fotoAvatar !== undefined) {
            return fotoAvatar = request.file.filename;
        }
        else {
            fotoAvatar = 'avatarDefault.png'
        }*/
        
        const newCadastro = {
            id: uuid(),
            ...request.body,
            avatar: request.file.filename,
            senha: senhaHash,
            confirmarsenha: confirmarsenhaHash
        };

        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));

        cadastro.push(newCadastro);

        fs.writeFileSync(
            cadastroFilePath, 
            JSON.stringify(cadastro));
           
        return response.redirect('/user/login');
        
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
      

        const newReforma = {
            id: uuid(),
            id_cliente: request.session.userLogged.id,
            ...request.body,
            fotos: request.files,
        };
        

        reforma.push(newReforma);

        fs.writeFileSync(fotosFilePath, JSON.stringify(reforma, null, ''));

           
        return response.render('areacliente', {userLogged: request.session.userLogged});
    },

    logout: (request, response) => {
        request.session.destroy();
        return response.redirect('/');
    }
}


module.exports = usercontroller;