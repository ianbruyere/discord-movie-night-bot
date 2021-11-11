const { Users, ActionShop, currency } = require('../dbObjects.js');
const { Op } = require('sequelize');

module.exports = {
    prefix: "!buy",
    fn: async(interaction, args) => {
        const itemName = args.join(' ');
        const item = await ActionShop.findOne({ where: { name: { [Op.like]: itemName } } });
        const user = await Users.findOne({ where: { user_id: interaction.author.id } });
        
        
        if (!item) return interaction.reply(`That item doesn't exist.`);
        if (item.cost > user.balance) {
            return interaction.reply(`You currently have ${user.balance}, but the ${item.name} costs ${item.cost}!`);
        }
        
        user.balance -= item.cost;
        await user.save();
        return interaction.reply(`You've bought: ${item.name}.`);
    }
}