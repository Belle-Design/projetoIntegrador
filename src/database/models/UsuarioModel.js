const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      especialidadesId: {
        type: DataTypes.INTEGER,
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
      confirmarsenha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dataNascimento:{
        type:DataTypes.DATE,
        allowNull: false,
      },
      avatar:{
        type: DataTypes.STRING,
      },
      receberSMS: {
        type:DataTypes.TINYINT,
      },
      receberEmail: {
        type:DataTypes.TINYINT,
      },
      criadoEm: {
        type: DataTypes.DATE,
      },
      atualizadoEm: {
        type: DataTypes.DATE,
      },
      
      
    },
    {
      tableName: "usuarios",
      timestamps: true,
      createdAt: "criadoEm",
      updatedAt: "atualizadoEm",
    },
    
  );


  Usuario.associate = (models) => {
    
    Usuario.belongsTo(models.especialidadeModel, {
      as: 'especialidade',
      foreignKey: 'especialidadesId'
    });
    Usuario.hasMany(models.reformaModel, {
      as: 'reformas',
      foreignKey: 'usuariosId'

    })

  }
  return Usuario;
};