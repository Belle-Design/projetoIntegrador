'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('fotosReformas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      reformasId: {
        type: Sequelize.DataTypes.INTEGER,
        references:{
          model:{
            tableName: 'reformas',
          },
          key: 'id',
        },
      },
      fotos:{
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('fotosReformas');
  }
};
