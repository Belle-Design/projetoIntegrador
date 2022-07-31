const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const cadastroFilePath = path.join(__dirname, '..', 'data', 'cadastroDataBase.json');

const logincontroller = {
    entrar: (request, response) => {
        return response.render ('login');
    },
    areacliente: (request, response)=>{
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

        request.session.idCadastro = cadastroFound.id;
        request.session.isAuthorized = true;

        response.render('areacliente',{nome: cadastroFound.nome, avatar: cadastroFound.avatar, id_cliente: cadastroFound.id});
        
        
        /* dadosSalvos = {
            nome: cadastroFound.nome,
            avatar: cadastroFound.avatar,
            id_cliente: cadastroFound.id
        } */
    },
}

module.exports = logincontroller;