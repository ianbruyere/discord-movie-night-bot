require('dotenv').config();
const Discord = require('discord.js');
const { dateFormatter, timeout } = require('../util/helpers.js')
const { User_Movies } = require('../dbObjects.js')


module.exports = {
    prefix: "!add_my_movie",
    fn: async (msg, args) => {
        let movieTitle = args.join(' ')
        movieTitle = movieTitle.replace(/[^a-zA-Z0-9 :']/g, '')
        const dateAdded = String(dateFormatter(new Date()))
        const newAddition = await User_Movies.create({title: movieTitle, user: msg.author.id, date_added: dateAdded})
        return msg.reply(`Added movie **${newAddition.title}** to ${msg.author}s watchlist`).then(timeout)
    }
}