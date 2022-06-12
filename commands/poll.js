require('dotenv').config();
const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const Discord = require('discord.js');
let optionsArray = require('../util/optionArray');
module.exports = {
    // Define the prefix
    prefix: "!poll",
    // Define a function to pass the message to
    fn: async (msg, args) =>  {
      const options = optionsArray.options
      // admins-only check
      if (!msg.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return msg.reply('Only Admins can create polls!')  
      //const options = optionArray;
      const pollParameters = args.join(' ')
      const pollTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;
      if (!pollTitle) return msg.channel.send('You need to specify a poll title').catch(err => console.log(err));
      pollParameters.replace(`{${pollTitle}}`, '');

      const pollsArray = pollParameters.match(squareRegex);
      if (!pollsArray) return msg.channel.send('You need to specify poll options').catch(err => console.log(err))

      let i = 0;
      const pollString = pollsArray.map(poll => `${options[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');

      const embed = {
        color: 'BLUE',
        title: pollTitle,
        description: pollString,
      };
      // send embed
      const message = await msg.channel.send({embeds: [embed]}).catch(err => console.log(err));
      // add voting reactions to embed
      for (i = 0; i < pollsArray.length; i++) await message.react(options[i]).catch(err => console.log(err)); 
    }  
}