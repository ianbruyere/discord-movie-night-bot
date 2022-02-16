const { Discord, Formatters } = require('discord.js');
const { User_Movies } = require('../dbObjects.js')

module.exports = {
    prefix: "!watch_list",
    fn: async (interaction, args) => {
        // returns list of watched movies
        const user_id = interaction.author.id;
        const movies = await User_Movies.findAll({user: user_id})
        return interaction.reply(`The following movies are on your watchlist:
        ${Formatters.codeBlock(movies.map(x =>  `${x.title}------${x.date_added}`).join('\n'))}`);
    }
}