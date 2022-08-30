const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const FotoReforma = sequelize.define(
    "FotoReforma",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      reformasId: {
        type: DataTypes.INTEGER,
      },
      fotos:{
        type: DataTypes.STRING,
      },
      criadoEm: {
        type: DataTypes.DATE,
      },
      atualizadoEm: {
        type: DataTypes.DATE,
      },
      
    },
    {
      tableName: "fotosReformas",
      timestamps: true,
      createdAt: "criadoEm",
      updatedAt: "atualizadoEm",
    }
  );

  FotoReforma.associate = (models) => {
    FotoReforma.belongsTo(models.reformaModel, {
      as: 'reformas',
      foreignKey: 'reformasId'
    });
  }

  return FotoReforma;
};