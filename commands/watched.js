const {Formatters, Discord } = require('discord.js');
const { Movies } = require('../dbObjects.js')
const { timeout } = require('../util/helpers.js')
const { ratings } = require('../util/arrays');

module.exports = {
    prefix: "!watched",
    fn: async (inter) => {
        // returns list of watched movies
        const movies = await Movies.findAll()
        longestTitleLength = Math.max(...(movies.map(el => el.title.length)));
        let currinter = "The following movies have been watched:\n\n"
        let interArr = ( movies.map(x =>  
            `${x.title} ${"-".repeat(3+(longestTitleLength-x.title.length))}${ratings[x.rating]}---${x.date_watched}`))
        
        while(interArr.length > 0) {
            currinter += interArr.shift() + "\n"
            if (currinter.length > 1900) {
                inter.reply(Formatters.codeBlock(currinter)).then(timeout)
                currinter = ""
            }
        }
        return inter.reply(Formatters.codeBlock(currinter)).then(timeout)
    }
}