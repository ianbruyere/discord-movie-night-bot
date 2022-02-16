require('dotenv').config();
const Discord = require('discord.js');
const { dateFormatter } = require('../util/helpers.js')
const { Movies } = require('../dbObjects.js')


module.exports = {
    prefix: "!add_watched",
    fn: async (msg, args) => {
        if (!msg.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return msg.reply('Only Admins can add watched movies!')
        const movieTitle = args.join(' ').split('|')[0]
        const rating = args.join().split('|')[1]
        const dateWatched = String(dateFormatter(new Date()))
        const newAddition = await Movies.create({title: movieTitle, date_watched: dateWatched, rating: rating})
        return msg.reply(`Have added movie ${newAddition.title} for date ${newAddition.date_watched}`)
    }
}