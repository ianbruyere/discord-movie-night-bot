const { Discord, Formatters } = require(`discord.js`);

module.exports = {
    // Will bring up all possible commands for Bot
    prefix: "!help_movie",
    fn: async (msg) => {
      msg.reply(
          `Welcome to Movie Night!\n` +
           `The Movie Bot adds to the fun!\n` +
           `Here's a list of commands.\n` +
           `Anything in <> are additional parameters to be provided by the User.` +
           `${Formatters.codeBlock(
            `!subscribe : command adds your user_id to the database so you can earn - and spend - money\n` +
            `!shop : Displays the shop.\n` + 
            `!balance : will tell you how much money you have\n` +
            `!buy <action_name> : allows you to buy from the action shop, meaning you take this action.\n` +
            `!watched : lists the movies the channel has watched and the date we watched them`
           )}` +
           `You earn money by attending movie night. Every night you attend you earn 2💰.\n\n` +
           `The Following Are Admin Only Commands:` +
           `${Formatters.codeBlock(
                `!grant <@username> <amount> <human-readabble username> : grants a user money\n` +
               `!add_movie <title of movie> : adds movie to database\n` +
               `!survey <question> <option-1> ... <option-4> : makes a survey\n` +
               `!test : making sure the bot actually works\n`
           )}`
        )
    }
}