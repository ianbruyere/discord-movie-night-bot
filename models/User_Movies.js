module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_watchlist', {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          primary_key: true
        },
        user : {
            type: DataTypes.STRING,
            primary_key: true

        },
        date_added: {
          type: DataTypes.STRING,
          allowNull: false
        },
      })
}