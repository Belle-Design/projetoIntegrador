const cepApi = require("../services/cepApi");


const cepController = {
    show: async (request, response) => {
        const {codigo} = request.params

        try {

            const {data: endereco} = await cepApi.get(`/cep/v2/${codigo}`);
            
            response.json (endereco);
        }
        catch (error) {
            console.log(error);
        }
    }   
}

module.exports = cepController;