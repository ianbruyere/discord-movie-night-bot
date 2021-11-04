const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('movies', {
        movie_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
}