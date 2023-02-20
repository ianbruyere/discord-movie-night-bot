const { Discord, Formatters } = require('discord.js');
const { User_Movies } = require('../dbObjects.js');
const { timeout } = require('../util/helpers.js');

module.exports = {
    prefix: "!watchlist",
    fn: async (inter) => {
        // returns list of watched movies
        const user_id = inter.author.id;
        const movies = await User_Movies.findAll({where: { user: user_id }})
        const longestTitleLength = Math.max(...(movies.map(x => x.title.length)))
        
        return inter.reply(
            `The following movies are on your watchlist:
        ${Formatters.codeBlock(
            movies.map(x =>  
            `${x.title}${"-".repeat(3+(longestTitleLength-x.title.length))}${x.date_added}`)
            .join('\n')
            )}`).then(timeout);
    }
}