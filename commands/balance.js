const { Users } = require('../dbObjects.js');
const { timeout } = require('../util/helpers.js');

module.exports = {
    prefix: "!balance",
    fn: async(interaction, args) => {
        // lets a user check balance
        const user_id = interaction.author.id;
        const user = await Users.findOne({where : {user_id: user_id}})
        if(!user) return interaction.reply('Subscribe first!')
        console.log(interaction.id)
        interaction.reply(`${interaction.author} has ${user.balance }💰\n` + 
        `You get 1💰/movie watched`)
            .then(timeout);
    }
}