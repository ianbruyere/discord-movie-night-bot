const Discord = require(`discord.js`);

module.exports = {
    // Define the prefix
    prefix: "!scratcher",
    // Define a function to pass the message to
    fn: async (msg) => {
      const args = msg.content.split(' ');
      let messageContent = '';
      if (args.includes('foo')) {
        messageContent += 'bar ';
      }
      if (args.includes('bar')) {
        messageContent += 'baz ';
      }
      if (args.includes('baz')) {
        messageContent += 'foo ';
      } else {
          messageContent += 'hello'
      }
      msg.channel.send(messageContent);
      const filter = m => m.content.startsWith('!')
      const options = {
        time: 20000,
          max: 1,
      };
    await msg.channel.awaitMessages({time:20000, max: 3, errors: ['time']})
     .then(collected => console.log(collected.array())).catch(e => msg.reply("TIMEOUT"))
    }
  }