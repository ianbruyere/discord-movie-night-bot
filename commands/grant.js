require('dotenv').config()
const idRegEx =/\d+/g;
const { Users } = require('../dbObjects.js');
const { timeout, is_admin } = require('../util/helpers.js');


module.exports = {
    prefix: "!grant",
    fn: async(inter, args) => {
        // admin hands out currency
        if (!is_admin(inter)) return inter.reply('Only Admins can grant currency!')
        let user_id = String(args[0]).match(idRegEx)[0]
        const user = await Users.findOne({ where: { user_id : user_id } })
        if (!user) return inter.reply("This user doesn't exist in database")
        const amount = Number(args[1]) ? args[1] : 1
        user.balance += amount
        await user.save()         
        inter.reply(`${args[2]} has been granted ${amount}💰`).then(timeout)
    }
}