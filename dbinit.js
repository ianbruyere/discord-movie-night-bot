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

  const ActionShop = require('./models/ActionShop.js')(sequelize, Sequelize.DataTypes);
  require('./models/Users.js')(sequelize, Sequelize.DataTypes);
  require('./models/Movie.js')(sequelize, Sequelize.DataTypes);
  require('./models/User_Movies.js')(sequelize, Sequelize.DataTypes);

  // sequelize.sync()
  sequelize.sync().then(async () => {
    const shop = [,
      ActionShop.upsert({ name: 'Roulette', cost: 3, description: "movie randomly selected from pool of watchlists" }),
      ActionShop.upsert({ name: 'Takeover', cost: 7, description: "choose a movie you've never seen before" }),
      ActionShop.upsert({ name: 'Double Trouble', cost: 10, description: "you're in charge of a double feature night" }),
      ActionShop.upsert({ name: 'Theme', cost: 15, description: "you control a set of movie nights, that follow a theme" }),
      ActionShop.upsert({ name: 'Rewatch', cost: 25, description: "choose a movie you've seen before, a perversion of Movie Night" }),
    ];
  
    await Promise.all(shop);
    sequelize.sync()
    console.log('Database synced');
  
  }).catch(console.error);