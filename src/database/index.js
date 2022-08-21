const sequelize = require('./config/sequelize');

const db = {
  usuarioModel: require('./models/UsuarioModel')(sequelize),
  reformaModel: require('./models/ReformaModel')(sequelize),
  especialidadeModel: require('./models/EspecialidadeModel')(sequelize),
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;