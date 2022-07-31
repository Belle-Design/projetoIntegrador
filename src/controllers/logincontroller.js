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

        const ISSERVER = typeof window === "undefined";

if (!ISSERVER) {
  localStorage.setItem("clienteLogado",JSON.stringify(cadastroFound));
}

        
        /* response.render('areacliente',{nome: clienteLogado.nome, avatar: clienteLogado.avatar, id_cliente: clienteLogado.id}); */
        response.redirect('/areacliente');
        
        
      
    },
}

module.exports = logincontroller;