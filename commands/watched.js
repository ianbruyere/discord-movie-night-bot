const {Formatters, Discord } = require('discord.js');
const { Movies } = require('../dbObjects.js')

module.exports = {
    prefix: "!watched",
    fn: async (msg) => {
        // returns list of watched movies
        const movies = await Movies.findAll()
        ratingsArray = [
            '🤬', 
            '💩',
            '😁',
            '🔥'
            ]
        return msg.reply(`The following movies have been watched:
        ${Formatters.codeBlock(movies.map(x =>  `${x.title}------${x.date_watched}-------${ratingsArray[x.rating]}`).join('\n'))}`);
    }
}