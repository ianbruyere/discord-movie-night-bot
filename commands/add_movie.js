require('dotenv').config();
const Discord = require('discord.js');
const { dateFormatter } = require('../util/helpers.js')
const { User_Movies } = require('../dbObjects.js')


module.exports = {
    prefix: "!add_movie",
    fn: async (msg, args) => {
        if (!msg.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return msg.reply('Only Admins can add watched movies!')
        const movieTitle = args.join(' ')
        const dateAdded = String(dateFormatter(new Date()))
        const newAddition = await User_Movies.create({title: movieTitle, user: msg.author.id, date_added: dateAdded})
        return msg.reply(`Added movie ${newAddition.title} for date ${newAddition.date_watched} for user ${msg.author}`)
    }
}