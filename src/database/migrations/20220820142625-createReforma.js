'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('reformas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuariosId: {
        type: Sequelize.INTEGER,
      },
      localReforma: {
        type: Sequelize.STRING,
      },
      comprimento: {
        type:Sequelize.INTEGER,
        allowNull: false,
      },
      largura: {
        type:Sequelize.INTEGER,
        allowNull: false,
      },
      altura: {
        type:Sequelize.INTEGER,
        allowNull: false,
      },
      fotos:{
        type: Sequelize.STRING,
      },
      dataReuniao:{
        type:Sequelize.DATE,
        allowNull: false,
      },
      criadoEm: {
        type: Sequelize.DATE,
      },
      atualizadoEm: {
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('reformas');
  }
};
