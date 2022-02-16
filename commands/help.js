require('dotenv').config();
const { Discord, Formatters } = require(`discord.js`);

module.exports = {
    // Will bring up all possible commands for Bot
    prefix: "!help_movie",
    fn: async (msg) => {
        header = `Here's a list of commands.\n` +
        `Anything in <> are parameters to be provided by the User.`
        standardHelp = `${Formatters.codeBlock(
            `!subscribe_movies : adds your user_id to database for the money earning\n` +
            `!shop : Displays shop.\n` + 
            `!balance : your balance\n` +
            `!buy <action_name> : buy from action shop, taking action and subtract cost from balance\n` +
            `!watched : lists movies watched and date watched\n` +
            `!add_movie <Movie Title> : Will add movie to your personal watchlist\n` +
            `!watcgh_list : Brings up your watchlist`
        )}`
        adminHelp = `Following For Admins:` +
            `${Formatters.codeBlock(
            `!grant <@username> <amount> <human-readabble username> : grants a user money\n` +
            `!add_watched <title of movie> : adds movie to database\n` +
            `!survey <question> <option-1> ... <option-4> : makes a survey\n` +
            `!test : making sure the bot actually works\n`
        )}`
        if (msg.member.roles.cache.has(process.env.ADMIN_ROLE_ID)){
            msg.reply(header + standardHelp + adminHelp)
        } else {msg.reply(header + standardHelp)}
    }
}