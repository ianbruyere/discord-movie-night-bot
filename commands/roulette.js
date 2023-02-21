require('dotenv').config();
const Discord = require(`discord.js`);
const { User_Movies, Users, ActionShop } = require('../dbObjects.js');
const { Op } = require("sequelize");
const { removeArticles, timeout, get_current_mem_ids, get_username, can_buy, is_admin } = require('../util/helpers.js');

module.exports = {
    // Define the prefix
    prefix: "!roulette",
    fn: async (inter) => {      
      // get current Members in chat
      const members = get_current_mem_ids(inter, process.env.MOVIE_NIGHT_VOICE_CHAT)
      // get actions
      const item = await ActionShop.findOne({ where: { name: { [Op.like]: "roulette" } } });  
      const user = await Users.findOne({ where: { user_id: inter.author.id } });

      // check to make sure user can make purchase
      if (!can_buy(user, item)) return inter.reply("You don't have enough funds!");
   
      // snag all movies on current participating members watchlists
      const movies = await User_Movies.findAll({ where: { user: { [Op.in]: members } } })

      // check to make sure we actually got movies
      if (movies.length == 0) return inter.reply("Must be in Movie Voice Chat to Trigger And have movies in your watchlist.")

      // choose one at random
      let selectedMovie = movies[Math.floor(Math.random() * movies.length)]
      console.log(movies.map(movie => movie.title))

      const username = await get_username(inter, selectedMovie.user)
      console.log(`Movie: ${selectedMovie.title}\nuser: ${username}`)
      // make it so only admin who spun can ensure a movie was correct
      //let filter = m => { m.author.id == inter.author.id }


      // send roulette result
      inter.channel.send(`Roulette Result is:\n` +
      `${"🥳".repeat(selectedMovie.title.length)}\n` +
      `${'\t'.repeat(selectedMovie.title.length/2)}**${selectedMovie.title}**\n` +
      `${"🥳".repeat(selectedMovie.title.length)}\n` +
      `Is this Movie alright? \`YES\` / \`NO\``).then(() => {
        // await response
        inter.channel.awaitMessages({
          //filter,
          max: 1,
          time: 120000,
          errors: ['time']
        }).then(async (message) => {
          message = message.first()
          // need to be admin to finalize decision
          if (!is_admin(message)) return message.reply("Must be admin to finalize movie selection")

          if (message.content.toUpperCase() == 'YES') {
            movieTitle = removeArticles(selectedMovie.title).toLowerCase()

            // find all matching movies
            //TODO make a helper command
            await User_Movies.destroy({
              where: { 
                title: {
                  [Op.like] : movieTitle
                }}
              }
            )// end of sequelize statement

            // subtract from balance 
            await Users.increment({balance : -item.cost}, {
              where: {
                user_id: selectedMovie.user
              }
            })

            message.reply("Movie Confirmed. Purging Entries from Watchlists")
          } else {
            message.reply("Movie Not Chosen.")//.then(timeout)
          }
        })
        .catch(collected => {
          console.log(collected)
          inter.channel.send('Command ended. Movie Not Selected');
        })
      }) // end of determination
  }
}