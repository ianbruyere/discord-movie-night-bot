const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const timeRegex = RegExp(/{(\d+(s|m|h|d|w))}/);
const Discord = require('discord.js');

module.exports = {
    // Define the prefix
    prefix: "!poll",
    // Define a function to pass the message to
    fn: async (msg, args) =>  {
        const options = [
            '🇦',
            '🇧',
            '🇨',
            '🇩',
        ]
      const pollParameters = args.join(' ')
      const pollTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;
      console.log(squigglyRegex.exec(pollParameters));

      if (!pollTitle) {
        return msg.channel.send('You need to specify a poll title').catch(err => console.log(err));
      }

      pollParameters.replace(`{${pollTitle}}`, '');
      const pollsArray = pollParameters.match(squareRegex);

      if (!pollsArray) {
        return msg.channel.send('You need to specify poll options').catch(err => console.log(err));
      }
      else if (pollsArray.length > 4) {
        return msg.channel.send('You can\'t have more than 4 poll options.').catch(err => console.log(err));
      }

      let i = 0;
      const pollString = pollsArray.map(poll => `${options[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');
      const timedPoll = timeRegex.test(args[1]) ? timeRegex.exec(args[1])[1] : null;

      const embed = {
        color: 'BLUE',
        title: pollTitle,
        description: pollString,
      };

      const message = await msg.channel.send({ embeds: [embed] }).catch(err => console.log(err));
    
      for (i = 0; i < pollsArray.length; i++) {
        await message.react(options[i]).catch(err => console.log(err));
      } 
    }  
}