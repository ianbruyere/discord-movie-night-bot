const { Sequelize } = require('sequelize');

// connection information
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'path_to_database'
  })

  require('./models/Movie.js')(sequelize, Sequelize.DataTypes);
  (async () => {
    await sequelize.sync()
    console.log("Tables Created")
    sequelize.close();
  })();

  

