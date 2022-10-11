"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("usuarios", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      especialidadesId: {
        type: Sequelize.DataTypes.INTEGER,
        references:{
          model:{
            tableName: 'especialidades',
          },
          key: 'id',
        },
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
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      confirmarsenha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dataNascimento: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      receberSMS: {
        type: Sequelize.TINYINT,
      },
      receberEmail: {
        type: Sequelize.TINYINT,
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
    return queryInterface.dropTable("usuarios");
  },
};
