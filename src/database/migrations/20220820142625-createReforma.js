"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("reformas", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuariosId: {
        type: DataTypes.INTEGER,
      },
      localReforma: {
        type: DataTypes.STRING,
      },
      comprimento: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      largura: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      altura: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cep: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rua: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      complemento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bairro: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cidade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      uf: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dataReuniao: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      criadoEm: {
        type: DataTypes.DATE,
      },
      atualizadoEm: {
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("reformas");
  },
};
