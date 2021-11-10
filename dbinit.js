require('dotenv').config();
const { Sequelize } = require('sequelize');

// connection information
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: process.env.DATABASE_PATH
  })

  require('./models/Movie.js')(sequelize, Sequelize.DataTypes);
  (async () => {
    await sequelize.sync({force: true})
    console.log("Tables Created")
    sequelize.close();
  })();

  

