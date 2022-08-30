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
    }
  );

  Reforma.associate = (models) => {
    Reforma.belongsTo(models.usuarioModel, {
      as: 'usuarios',
      foreignKey: 'usuariosId'
    });

    Reforma.hasMany(models.fotoReformaModel, {
      as: 'fotosReformas',
      foreignKey: 'reformasId'

    })
  }

  return Reforma;
};