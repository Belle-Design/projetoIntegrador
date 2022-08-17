const sequelize = require('./config/sequelize');

const db = {
  clienteModel: require('./models/clienteModel')(sequelize),
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;