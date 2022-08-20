const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Reforma = sequelize.define(
    "Reforma",
    {
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
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comprimento: {
        type:DataTypes.INTEGER,
        allowNull: false,
      },
      largura: {
        type:DataTypes.INTEGER,
        allowNull: false,
      },
      altura: {
        type:DataTypes.INTEGER,
        allowNull: false,
      },
      fotos:{
        type: DataTypes.STRING,
      },
      dataReuniao:{
        type:DataTypes.DATE,
        allowNull: false,
      },
      criadoEm: {
        type: DataTypes.DATE,
      },
      atualizadoEm: {
        type: DataTypes.DATE,
      },
      
    },
    {
      tableName: "reformas",
      timestamps: true,
      createdAt: "criadoEm",
      updatedAt: "atualizadoEm",
    });

  return Reforma;
};