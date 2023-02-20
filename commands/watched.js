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
        let currMsg = "The following movies have been watched:\n\n"
        let msgArr=(movies.map(x =>  
            `${x.title} ${"-".repeat(3+(longestTitleLength-x.title.length))}${ratingsArray[x.rating]}---${x.date_watched}`))
        
        while(msgArr.length > 0) {
            currMsg += msgArr.shift() + "\n"
            if (currMsg.length > 1900) {
                msg.reply(Formatters.codeBlock(currMsg)).then(timeout)
                currMsg = ""
            }
        }
        return msg.reply(Formatters.codeBlock(currMsg)).then(timeout)
    }
}