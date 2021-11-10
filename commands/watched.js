const Discord = require('discord.js');
const { Movies } = require('../dbObjects.js')

module.exports = {
    prefix: "!watched",
    fn: async (msg, args) => {
        // returns list of watched movies
        // TODO nicer formatting
        const movies = await Movies.getMovies()
        return msg.reply(`The following movies have been watched: \n 
        ${movies.map(x =>  `${x.title} \t ${x.date_watched}`).join('\n')}`);
    }
}