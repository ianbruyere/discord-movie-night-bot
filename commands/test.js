const Discord = require(`discord.js`);

module.exports = {
    // Define the prefix
    prefix: "!test",
    fn: async (message) => {
      console.log("Here!")
    }
}