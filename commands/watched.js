const {Formatters, Discord } = require('discord.js');
const { Movies } = require('../dbObjects.js')
const { timeout } = require('../util/helpers.js')

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
        longestTitleLength = Math.max(...(movies.map(el => el.title.length)));
        msg.reply(
            `The following movies have been watched:
        ${Formatters.codeBlock(movies.map(x =>  `${x.title} ${"-".repeat(3+(longestTitleLength-x.title.length))} ${ratingsArray[x.rating]} --- ${x.date_watched}`).join('\n'))}`)
        .then(timeout)
    }
}