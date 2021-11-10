const Discord = require('discord.js');
const { dateFormatter } = require('../util/helpers.js')
const { Movies } = require('../dbObjects.js')


module.exports = {
    prefix: "!add_movie",
    fn: async (msg, args) => {
        // TODO add admin only privledge
        // TODO need to account for spaces in
        const movieTitle = args[0]
        const dateWatched = String(dateFormatter(new Date()))
        const newAddition = await Movies.create({title: movieTitle, date_watched: dateWatched})
        msg.reply(`Have added movie ${newAddition.title} for date ${newAddition.date_watched}`)
    }
}