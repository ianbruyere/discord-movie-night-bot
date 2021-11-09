const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('watched_movie', {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        date_watched: {
          type: DataTypes.DATE,
          allowNull: false
        }
      })
}