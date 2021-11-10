const { Users, ActionShop, currency } = require('../dbObjects.js');


module.exports = {
    prefix: "!buy",
    fn: async(interaction, args) => {
        const itemName = interaction.options.getString('item');
        const item = await ActionShop.findOne({ where: { name: { [Op.like]: itemName } } });
        
        if (!item) return interaction.reply(`That item doesn't exist.`);
        if (item.cost > currency.getBalance(interaction.user.id)) {
            return interaction.reply(`You currently have ${currency.getBalance(interaction.user.id)}, but the ${item.name} costs ${item.cost}!`);
        }
        
        const user = await Users.findOne({ where: { user_id: interaction.user.id } });
        currency.add(interaction.user.id, -item.cost);
        
        return interaction.reply(`You've bought: ${item.name}.`);
    }
}