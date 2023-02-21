const { Users } = require('../dbObjects.js');
const { timeout } = require('../util/helpers.js');

module.exports = {
    prefix: "!balance",
    fn: async(inter) => {
        // lets a user check balance
        const user_id = inter.author.id;
        const user = await Users.findOne({ where : { user_id: user_id } })
        if(!user) return inter.reply('Subscribe first!')

        inter.reply(`${inter.author} has ${user.balance}💰\n` + 
        `You get 1💰/movie watched`)
            .then(timeout);
    }
}