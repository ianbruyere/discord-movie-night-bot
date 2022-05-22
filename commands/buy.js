require('dotenv').config();
const { Users, ActionShop } = require('../dbObjects.js');
const { Op } = require('sequelize');

module.exports = {
    prefix: "!buy",
    fn: async(interaction, args) => {
        const itemName = args.join(' ');
        const item = await ActionShop.findOne({ where: { name: { [Op.like]: itemName } } });
        const user = await Users.findOne({ where: { user_id: interaction.author.id } });
        const userName = interaction.author;
        const channel = interaction.guild.channels.cache.get(process.env.MOVIE_NIGHT_TEXT_CHANNEL)
        console.log(item)
        if (!item) return interaction.reply(`That item doesn't exist.`);
        if (item.cost > user.balance) {
            return interaction.reply(`You currently have ${user.balance}, but the ${item.name} costs ${item.cost}!`);
        }
        
        user.balance -= item.cost;
        await user.save();
        goodbyeMovieBucks = "💸".repeat(item.cost)
        return channel.send(`${userName}\n` + 
        `${goodbyeMovieBucks}\n` +
        `Being free with that **PAPER**.\n` +
        `${item.name} takes effect for Upcoming Movie Night.\n` +
        `${goodbyeMovieBucks}`);
    }
}