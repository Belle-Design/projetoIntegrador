const sequelize = require('./config/sequelize');

const db = {
  usuarioModel: require('./models/UsuarioModel')(sequelize),
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;