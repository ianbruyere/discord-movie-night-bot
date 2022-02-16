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

  // const ActionShop = require('./models/ActionShop.js')(sequelize, Sequelize.DataTypes);
  // require('./models/Users.js')(sequelize, Sequelize.DataTypes);
  // require('./models/Movie.js')(sequelize, Sequelize.DataTypes);
  require('./models/User_Movies.js')(sequelize, Sequelize.DataTypes);

  // sequelize.sync()
  // sequelize.sync({ force: false }).then(async () => {
  //   const shop = [
  //     ActionShop.upsert({ name: 'Double Vote', cost: 1 }),
  //     ActionShop.upsert({ name: 'Survey Takeover', cost: 3 }),
  //     ActionShop.upsert({ name: 'Takeover', cost: 5 }),
  //   ];
  
    // await Promise.all(shop);
    sequelize.sync()
    console.log('Database synced');
  
  // }).catch(console.error);