require('dotenv').config();
const Discord = require(`discord.js`);
const { Users } = require('../dbObjects.js');

module.exports = {
    // Define the prefix
    prefix: "!test",
    fn: async (interaction) => {
      if (!interaction.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return msg.reply('Only Admins can test!')
      const channel = interaction.guild.channels.cache.get(process.env.MOVIE_NIGHT_VOICE_CHAT)
      const members = channel.members
      //console.log(members)
      for(let [user_id, guildMember] of members) {
        const user = await Users.findOne({user_id : user_id})
        user.balance += 2
        await user.save()         
        interaction.reply(`Everyone In Voice Channel Movie-Night has been granted 2💰`)
      }
    }
}