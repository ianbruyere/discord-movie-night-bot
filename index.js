require('dotenv').config();
const fs = require('fs')
const { Client, Intents } = require('discord.js')
const client = new Client({intents : [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.DIRECT_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS
]
})


// create empty commands object
const commands = {}
// Get the file names from the commands directory
const files = fs.readdirSync('./commands')
// Filter out any non-js files and any .test.js files
const jsFiles = files.filter(file => file.endsWith('.js') && !file.endsWith('test.js'))
// Foreach, require the file, check for the right exports, add to command object
jsFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`)
    if (command.prefix && command.fn) {
        commands[command.prefix] = command.fn;
    }
})

// Register an event so when bot is ready it will log a message
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

// Register an event to handle incoming messages
client.on('messageCreate', async msg => {
  // grab the prefix, which should be the content before the first space
  const prefix = msg.content.split(' ')[0];
  // Filter out bad commands and bots
  if (commands[prefix] === undefined || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  // Execute the fn of the prefix object
  commands[prefix](msg, args);
});

// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(process.env.DISCORD_BOT_TOKEN);