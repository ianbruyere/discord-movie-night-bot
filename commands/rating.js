require('dotenv').config()
const idRegEx = RegExp(/\d+/);
const { Users } = require('../dbObjects.js');

module.exports = {
    prefix: "!rate",
    fn: async(msg) => {
        msg.reply("We've only got 3 ratings here:\n" + 
        "🔥: endlessly digestible, the flames burn hot stomach and soul\n" + 
        "😁: would reccommend people to watch at least once\n" + 
        "💩: fun with friends, but couldn't stomach on own\n" +
        "🤬: reserved for offensive, toxic, or unwatcheable")
    }
}