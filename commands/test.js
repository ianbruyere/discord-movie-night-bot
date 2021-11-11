const Discord = require(`discord.js`);

module.exports = {
    // Define the prefix
    prefix: "!test",
    fn: async (msg) => {
      if (!msg.member.roles.cache.has('908139298811969566')) return msg.reply('Only Admins can grant currency!')
      console.log("Here!")
    }
}