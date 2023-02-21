require('dotenv').config();
const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const Discord = require('discord.js');
const { options } = require('../util/arrays');
const { is_admin } = require('../util/helpers.js')


module.exports = {
    // Define the prefix
    prefix: "!poll",
    // Define a function to pass the message to
    fn: async (inter, args) =>  {
      // admins-only check
      if (is_admin(inter)) return inter.reply('Only Admins can create polls!')  

      const pollParameters = args.join(' ')
      const pollTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;
      if (!pollTitle) return inter.channel.send('You need to specify a poll title').catch(err => console.log(err));
      pollParameters.replace(`{${pollTitle}}`, '');

      const pollsArray = pollParameters.match(squareRegex);
      if (!pollsArray) return inter.channel.send('You need to specify poll options').catch(err => console.log(err))

      let i = 0;
      const pollString = pollsArray.map(poll => `${options[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');

      const embed = {
        color: 'BLUE',
        title: pollTitle,
        description: pollString,
      };
      // send embed
      const message = await inter.channel.send({embeds: [embed]}).catch(err => console.log(err));
      // add voting reactions to embed
      for (i = 0; i < pollsArray.length; i++) await message.react(options[i]).catch(err => console.log(err)); 
    }  
}