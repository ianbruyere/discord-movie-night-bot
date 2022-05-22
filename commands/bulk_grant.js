require('dotenv').config();
const Discord = require(`discord.js`);
const { Users } = require('../dbObjects.js');
const { timeout } = require('../util/helpers.js');

module.exports = {
    // Define the prefix
    prefix: "!bulk_grant",
    fn: async (interaction, args) => {
      if (!interaction.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return msg.reply('Only Admins can !bulk_grant!')
      const channel = interaction.guild.channels.cache.get(process.env.MOVIE_NIGHT_VOICE_CHAT)
      const members =  channel.members
      console.log(members)
      const amt = Number(args[0])
      for(let [user_id, guildMember] of members) {
        let user = await Users.findOne({where : {user_id : user_id}})
        console.log(user)
        if (!user) continue;
        console.log(`user balance${user.balance}`)
        if (user.balance <= 20) {
           user.balance += amt
        }
        console.log(`user balance after: ${user.balance}`)
        await user.save()         
      }
      interaction.reply(`Everyone in Voice Channel Movie-Night has been granted ${amt}💰`)
        .then(timeout)
    }
}