const Discord = require('discord.js');
const { dateFormatter } = require('../util/helpers.js')
const { Movies } = require('../dbObjects.js')


module.exports = {
    prefix: "!add_movie",
    fn: async (msg, args) => {
        if (!msg.member.roles.cache.has('908139298811969566')){
            return msg.reply('Only Admins can add movies!')
        }
        const movieTitle = args.join(' ')
        const dateWatched = String(dateFormatter(new Date()))
        const newAddition = await Movies.create({title: movieTitle, date_watched: dateWatched})
        return msg.reply(`Have added movie ${newAddition.title} for date ${newAddition.date_watched}`)
    }
}