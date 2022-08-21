'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('especialidades',[
    {
      nome:'ADM',
    },
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
