const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Especialidade = sequelize.define(
    "Especialidade",
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
      criadoEm: {
        type: DataTypes.DATE,
      },
      atualizadoEm: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "especialidades",
      timestamps: true,
      createdAt: "criadoEm",
      updatedAt: "atualizadoEm",
    }
  );
  Especialidade.associate = (models) => {
    Especialidade.hasMany(models.usuarioModel, {
      as: 'usuarios',
      foreignKey: 'especialidadesId'
    });
  }

  return Especialidade;
};