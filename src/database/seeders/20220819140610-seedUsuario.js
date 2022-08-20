'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('usuarios',[
    {
      nome:"Belle",
      sobrenome: "Design",
      email: "belle.design@email.com",
      senha: 1234,
      confirmarsenha: 1234,
      telefone: '11888888888',
      dataNascimento: 1540-10-12,
      avatar:'teste',
      receberSMS: 1,
      receberEmail: 1

    },
    
    ])
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usuarios', null, {})
  }
};
