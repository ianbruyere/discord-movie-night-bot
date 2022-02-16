module.exports = (sequelize, DataTypes) => {
    return sequelize.define('watched_movie', {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        date_watched: {
          type: DataTypes.STRING,
          allowNull: false
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: true
        }
      })
}