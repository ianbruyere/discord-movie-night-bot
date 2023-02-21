require('dotenv').config();
const Discord = require(`discord.js`);
const { Users } = require('../dbObjects.js');

module.exports = {
    // Define the prefix
    prefix: "!awake",
    fn: async () => {
      console.log("Here and ready to serve")
    }
}