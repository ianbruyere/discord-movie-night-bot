require('dotenv').config();
const Discord = require('discord.js');
const { dateFormatter, timeout } = require('../util/helpers.js')
const { User_Movies } = require('../dbObjects.js')


module.exports = {
    prefix: "!add_my_movie",
    fn: async (inter, args) => {
        let movieTitle = args.join(' ')
        movieTitle = movieTitle.replace(/[^a-zA-Z0-9 :']/g, '')
        const dateAdded = String(dateFormatter(new Date()))
        const curr_list = await User_Movies.findAll({ where: { user: inter.author.id } })
        
        // limiting number of movies users can have
        if(curr_list.length >= process.env.WATCHLIST_MAX) {
            return inter.reply(`You can't have more then ${process.env.WATCHLIST_MAX} movies at a time on your to-watch list.\nTalk to your admin for more details`)
        }
        const newAddition = await User_Movies.create({title: movieTitle, user: inter.author.id, date_added: dateAdded})
        return inter.reply(`Added movie **${newAddition.title}** to ${inter.author}s watchlist`).then(timeout)
    }
}