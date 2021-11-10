require('dotenv').config();
const Sequelize = require('sequelize');

// connection information
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: process.env.DATABASE_PATH
  })

const Movies = require('./models/Movie.js')(sequelize, Sequelize.DataTypes)

Reflect.defineProperty(Movies.prototype, 'getMovies', {
    value: function getMovies() {
        return Movies.findAll()
    }
})

module.exports = { Movies }