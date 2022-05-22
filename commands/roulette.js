require('dotenv').config();
const Discord = require(`discord.js`);
const { User_Movies } = require('../dbObjects.js');
const { Op } = require("sequelize");
const { removeArticles, timeout } = require('../util/helpers.js');

module.exports = {
    // Define the prefix
    prefix: "!roulette",
    fn: async (interaction) => {
      // only admin can do it
      if (!interaction.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return interaction.reply('Only Admins can spin the wheel!')
      // snag all the movies
      const movies = await User_Movies.findAll()
      // choose one at random
      let selectedMovie = movies[Math.floor(Math.random() * movies.length)].title
      // get appropiate channel to send response in
      //const channel = interaction.channel.id//(!process.env.DEBUG ? interaction.guild.channels.cache.get(process.env.MOVIE_NIGHT_TEXT_CHANNEL) : interaction.guild.channels.cache.get(process.env.TESTING_TEXT_CHANNEL))
      // make it so only admin who spun can ensure a movie was correct
      //let filter = m => { m.author.id == interaction.author.id }


      // send roulette result and ask for confirmation from spinner(admin)
      interaction.channel.send(`Roulette Result is:\n` +
      `${"🥳".repeat(selectedMovie.length)}\n` +
      `${'\t'.repeat(selectedMovie.length/2)}**${selectedMovie}**\n` +
      `${"🥳".repeat(selectedMovie.length)}\n` +
      `Is this Movie alright? \`YES\` / \`NO\``).then(() => {
        // await response
        interaction.channel.awaitMessages({
          //filter,
          max: 1,
          time: 600000,
          errors: ['time']
        })
        .then(async (message) => {
          message = message.first()
          if (message.content.toUpperCase() == 'YES') {
            movieTitle = removeArticles(selectedMovie).toLowerCase()
            // find all matching movies
            const moviesToBeDeleted = await User_Movies.destroy({
              where: { 
                user: '309110524690300929',
                // title: {
                //   [Op.like] : movieTitle
                // }}
              }
            }); // end of sequelize statement
            
            message.reply("Movie Confirmed. Purging Entries from Watchlists").then(timeout)
            console.log(moviesToBeDeleted)
          } else {
            message.reply("Movie Not Chosen. Ask Admin to Spin Wheel Again.").then(timeout)
          }
        })
        .catch(collected => {
          interaction.channel.send('Timeout');
        })
      })
  }
}