require('dotenv').config();
const { Formatters, Discord } = require('discord.js');
const { dateFormatter, timeout } = require('../util/helpers.js')
const { User_Movies } = require('../dbObjects.js')
// const { timeout } = require('../util/helpers.js');


module.exports = {
    prefix: "!watchlists",
    fn: async (inter) => {
        if (!inter.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return inter.reply('Only Admins can see ALL user watchlists!')
        const movies = await User_Movies.findAll()
        const mems = await inter.guild.members.fetch() // chan.members;
        const longestTitleLength = Math.max(...(movies.map(x => x.title.length)))
        let msgArr = movies.sort((a, b) => b.user - a.user)
            .map(x =>  
              `${x.title}${"-".repeat(3+(longestTitleLength-x.title.length))}${x.date_added}---${mems.get(x.user).user.username}`)
        let currMsg = ""

        while(msgArr.length > 0) {
            currMsg += msgArr.shift() + "\n"
            if (currMsg.length > 1900) {
                inter.reply(Formatters.codeBlock(currMsg)).then(timeout)
                currMsg = ""
              }
        }
        return inter.reply(Formatters.codeBlock(currMsg)).then(timeout)
  }        
}
