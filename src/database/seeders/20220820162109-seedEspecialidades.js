'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('especialidades',[
    {
      nome:'Cliente',
    },
    {
      nome:'Arquiteto',
    },
    
    ])
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('especialidades', null, {})
  }
};
