const Discord = require('discord.js');
// const { Sequelize, Model, DataTypes, STRING } = require('sequelize');
const { Movies } = require('../dbObjects.js')


module.exports = {
    prefix: "!add_movie",
    fn: async (msg, args) => {
        // will return a list of movies watched on the channel
        // needs database
        const movieTitle = args[0]
        console.log(movieTitle)
        var dateWatched = new Date()
        const offset = dateWatched.getTimezoneOffset()
        dateWatched = new Date(dateWatched.getTime() - (offset*60*1000))
        const newAddition = await Movies.create({title: movieTitle, date_watched: dateWatched})
        msg.reply(`Have added movie ${newAddition.movieTitle} for date ${newAddition.date_watched}`)
    }
}