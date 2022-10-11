"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("reformas", {
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
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      largura: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      altura: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      uf: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dataReuniao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      criadoEm: {
        type: Sequelize.DATE,
      },
      atualizadoEm: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("reformas");
  },
};
