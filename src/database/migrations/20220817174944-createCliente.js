'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('clientes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sobrenome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      receberSMS: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      receberEmail: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clientes');
  }
};
