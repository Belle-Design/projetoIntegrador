const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Cliente = sequelize.define(
    "cliente",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sobrenome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      avatar: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      receberSMS: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      receberEmail: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      
    },
    {
      tableName: "clientes",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );

  return Cliente;
};