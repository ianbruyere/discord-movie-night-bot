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
        const curr_list = await User_Movies.findAll({
            where: {
                user: msg.author.id
            }
        })
        if(curr_list.length >= process.env.WATCHLIST_MAX) return msg.reply(`You can't have more then ${process.env.WATCHLIST_MAX} movies at a time on your to-watch list.\nTalk to your admin for more details`)
        const newAddition = await User_Movies.create({title: movieTitle, user: msg.author.id, date_added: dateAdded})
        return msg.reply(`Added movie **${newAddition.title}** to ${msg.author}s watchlist`).then(timeout)
    }
}