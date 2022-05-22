require('dotenv').config();
const { Formatters, Discord } = require('discord.js');
const { dateFormatter, timeout } = require('../util/helpers.js')
const { User_Movies } = require('../dbObjects.js')


module.exports = {
    prefix: "!user_watchlists",
    fn: async (inter) => {
        if (!inter.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return inter.reply('Only Admins see ALL user watchlists!')
        const movies = await User_Movies.findAll()
        const mems = await inter.guild.members.fetch() // chan.members;
        const longestTitleLength = Math.max(...(movies.map(x => x.title.length)))        
        return inter.reply(
            `The following movies are on your watchlist:
            ${Formatters.codeBlock(
              movies.sort((a, b) => b.user - a.user)
                .map(x =>  
                  `${x.title}${"-".repeat(3+(longestTitleLength-x.title.length))}${x.date_added}---${mems.get(x.user).user.username}`)
                .join('\n')
              )}`
            ).then(timeout);
    }
}