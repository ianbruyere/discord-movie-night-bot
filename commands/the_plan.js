require('dotenv').config();
const { Discord, Formatters } = require(`discord.js`);
const { removeArticles, timeout } = require('../util/helpers.js');

module.exports = {
    prefix: "!the_plan",
    fn: async (msg) => {
        header = `2023 Movie Night Goals!\n`
        goals = `${Formatters.codeBlock(
            `Goal 1. To Watch All Mad Maxes.\n` +
            `Goal 2. To Watch The Godfather Trilogy.\n` + 
            `Goal 3. To Watch 3 "Epic" Length Films(3+hours).\n` +
            `\t*2001: A Space Odyssey\n` +
            `\t*Sholay\n` +
            `\t*User Choice\n` +
            `Goal 4. To Watch 25% of Kanopys Intro To Film Movies.`
        )}`
        msg.reply(header + goals).then(timeout)
    }

}