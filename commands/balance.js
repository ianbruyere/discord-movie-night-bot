const { Users } = require('../dbObjects.js');

module.exports = {
    prefix: "!balance",
    fn: async(interaction, args) => {
        // lets a user check balance
        const user_id = interaction.author.id;
        const user = await Users.findOne({user_id: user_id})
        if(!user) return interaction.reply('Subscribe first!')
        return interaction.reply(`${interaction.author} has ${user.balance }💰`);
    }
}