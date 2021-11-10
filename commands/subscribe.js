const Discord = require('discord.js')
const { Users } = require('../dbObjects.js')

module.exports = {
    prefix: "!subscribe",
    fn: async(interaction, args) => {
        // will insert user id into database if they want to opt in
        if (args[0] !== 'movies') return;
        await Users.create({user_id: interaction.author.id})
        interaction.reply(`${interaction.author} has subscribed to movies!`)

    }
}