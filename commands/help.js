require('dotenv').config();
const { Discord, Formatters } = require(`discord.js`);

module.exports = {
    // Will bring up all possible commands for Bot
    prefix: "!help",
    fn: async (msg) => {
        header = `List of commands.\n`
        standardHelp = `${Formatters.codeBlock(
            `!subscribe : adds your user_id to database for the money earning\n` +
            `!shop : Displays shop.\n` + 
            `!balance : your balance\n` +
            `!buy action_name : buy from action shop, cost subtracted from balance\n` +
            `!watched : lists movies watched and date watched\n` +
            `!add_my_movie Movie_Title : adds movie to personal watchlist\n` +
            `!watchlist : Brings up your watchlist\n` +
            `!rating : rating guide`
        )}`
        adminHelp = `Following For Admins:` +
            `${Formatters.codeBlock(
            `!grant @username amt human-readable-username> : grants a user money\n` +
            `!bulk_grant x: gives all in Movie Night Voice Channel x-amount of money\n` +
            `!bookkeeping : shows everyones balance\n` +
            `!watchlists : shows everyones watchlists\n` +
            `!roulette : randomly chooses movie from user watchlists\n` + 
            `!add_watched Movie_Title|Rating : adds movie to database\n` +
            `!poll {question} [option-1]... [option-15]> : makes a survey\n` +
            `!purge : removes bot messages from 100 latest messages\n` +
            `!test : making sure the bot actually works\n`
        )}`
        if (msg.member.roles.cache.has(process.env.ADMIN_ROLE_ID)){
            msg.reply(header + standardHelp + adminHelp)
        } else {msg.reply(header + standardHelp)}
    }
}