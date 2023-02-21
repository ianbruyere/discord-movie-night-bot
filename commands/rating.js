require('dotenv').config()
const { timeout } = require('../util/helpers.js');

module.exports = {
    prefix: "!rating",
    fn: async(inter) => {
        inter.reply("We've only got 3 ratings here:\n" + 
        "🔥: endlessly digestible, the flames burning eternally in stomach and soul\n" + 
        "😁: worth repeated viewings.\n" + 
        "💩: worth a watch, but you're not going to stump for it\n" +
        "🤬: reserved for offensive, toxic, or unwatcheable").then(timeout)
    }
}