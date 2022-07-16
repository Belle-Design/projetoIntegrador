const clientecontroller = {
    cliente: (request, response) => {
        return response.redirect ('/login');
    },
    acesso: (request, response)=>{
        return response.render('areacliente');
    }
}
module.exports = clientecontroller;