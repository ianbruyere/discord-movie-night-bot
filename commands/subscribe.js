const { Discord, Formatters } = require('discord.js')
const { Users } = require('../dbObjects.js')

module.exports = {
    prefix: "!subscribe",
    fn: async(inter) => {
        // will insert user id into database for movies if they want to opt in
        await Users.create({user_id: inter.author.id})
        inter.reply(`${inter.author} has subscribed to movies!`)
    }
}