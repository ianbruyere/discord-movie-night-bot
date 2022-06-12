require('dotenv').config()
const { timeout } = require('../util/helpers.js');

module.exports = {
    prefix: "!rating",
    fn: async(msg) => {
        msg.reply("We've only got 3 ratings here:\n" + 
        "🔥: endlessly digestible, the flames burning eternally in stomach and soul\n" + 
        "😁: enjoyable, entertaining\n" + 
        "💩: so bad it's good, but also potentially unwatchable/un-rewatchable\n" +
        "🤬: reserved for offensive, toxic, or unwatcheable").then(timeout)
    }
}