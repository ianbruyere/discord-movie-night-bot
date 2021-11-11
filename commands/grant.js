require('dotenv').config()
const idRegEx = RegExp(/\d+/);
const { Users } = require('../dbObjects.js');


module.exports = {
    prefix: "!grant",
    fn: async(msg, args) => {
        // admin hands out currency
        if (!msg.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return msg.reply('Only Admins can grant currency!')
        const user_id = idRegEx.exec(args[0])[1]
        const user = await Users.findOne({user_id : user_id})
        const amount = Number(args[1])
        user.balance += amount
        await user.save()         
        msg.reply(`${args[2]} has been granted ${amount}💰`)
    }
}