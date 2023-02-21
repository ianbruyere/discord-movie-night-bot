require('dotenv').config();
const Discord = require('discord.js');
const { purgeExclude, is_admin } = require('../util/helpers');


module.exports = {
    prefix: "!purge",
    fn: async (inter) => {
        if (!is_admin(inter)) return inter.reply('Only Admins can purge!')
        inter.channel.messages.fetch({ limit: 100 }).then(messages => {
            messages.forEach(msg => {
                if ((msg.author.id == process.env.DISCORD_BOT_ID || msg.content.startsWith("!")) && !purgeExclude(msg.content)) {
                    console.log("DELETING MESSAGE\n" + msg.content)
                    msg.delete()
                } 
            })
        })
    }
}