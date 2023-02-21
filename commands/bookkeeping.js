const { Users } = require('../dbObjects.js');
const { timeout, is_admin } = require('../util/helpers.js');
const { Formatters, Discord } = require('discord.js');


module.exports = {
    prefix: "!bookkeeping",
    fn: async(inter) => {
        // ADMINS only
        if (!is_admin(inter)) return inter.reply('Only Admins can Bookkeep!')

        const users = await Users.findAll()
        const mems = await inter.guild.members.fetch()
        // const longestUsername = Math.max(...(users.map(x=>x.us)))

        
        return inter.reply(
            `Here's the Balance Book:
            ${Formatters.codeBlock(
              users.sort((a, b) => b.balance - a.balance)
                .map(x =>  
                  `${x.balance}${"-".repeat(3)}---${mems.get(x.user_id).user.username}`)
                .join('\n')
              )}`
        ).then(timeout)
    }
}