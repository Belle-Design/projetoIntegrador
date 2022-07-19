const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const cadastroFilePath = path.join(__dirname, '..', 'data', 'cadastroDataBase.json');

const logincontroller = {
    entrar: (request, response) => {
        return response.render ('login');
    },
    getAcess: (request, response)=>{
        const { email, senha} = request.body;

        const cadastro = JSON.parse(fs.readFileSync(cadastroFilePath, 'utf-8'));

        const cadastroFound = cadastro.find(cadastro => cadastro.email === email);

        if(!cadastroFound){
            return response.status(401).redirect('/login');
        }
        const issenhaCorrect = bcrypt.compareSync(senha, cadastroFound.senha);

        if (!issenhaCorrect) {
            return response.status(401).redirect('/login');
        }

        request.session.idCadastro = cadastroFound.id;
        request.session.isAuthorized = true;

        return response.render('areacliente');
    }
}

module.exports = logincontroller;