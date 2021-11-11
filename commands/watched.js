const {Formatters, Discord } = require('discord.js');
const { Movies } = require('../dbObjects.js')

module.exports = {
    prefix: "!watched",
    fn: async (msg) => {
        // returns list of watched movies
        // TODO nicer formatting
        const movies = await Movies.findAll()
        return msg.reply(`The following movies have been watched:
        ${Formatters.codeBlock(movies.map(x =>  `${x.title}------${x.date_watched}`).join('\n'))}`);
    }
}