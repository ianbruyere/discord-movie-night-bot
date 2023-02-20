require('dotenv').config();
const Discord = require(`discord.js`);
const { Users } = require('../dbObjects.js');
const { timeout, get_current_mem_ids } = require('../util/helpers.js');
const { Op } = require("sequelize");


module.exports = {
    // Define the prefix
    prefix: "!bulk_grant",
    fn: async (interaction, args) => {
      if (!interaction.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return msg.reply('Only Admins can !bulk_grant!')
      
      const members = get_current_mem_ids(interaction, process.env.MOVIE_NIGHT_VOICE_CHAT)  
      const amt = Number(args[0])
      const users = await Users.increment({balance : +amt}, {
        where: {
          balance : {[Op.lt] : process.env.MAX_CURRENCY},
          user_id: {
            [Op.in]: members
          }
        }
      })
      console.log("DONE!")
    }
}
