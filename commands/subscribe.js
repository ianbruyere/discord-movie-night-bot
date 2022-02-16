const { Discord, Formatters } = require('discord.js')
const { Users } = require('../dbObjects.js')

module.exports = {
    prefix: "!subscribe_movies",
    fn: async(interaction, args) => {
        // will insert user id into database for movies if they want to opt in
        await Users.create({user_id: interaction.author.id})
        interaction.reply(`${interaction.author} has subscribed to movies!`)

    }
}