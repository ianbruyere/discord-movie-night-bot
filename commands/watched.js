const Discord = require('discord.js');
// const { Sequelize, Model, DataTypes, STRING } = require('sequelize');
const { Movies } = require('../dbObjects.js')


module.exports = {
    prefix: "!watched",
    fn: async (msg, args) => {
        // will return a list of movies watched on the channel
        // needs database
        const movies = await Movies.findAll()
        return msg.reply(`The following movies have been watched: \n 
        ${movies.map(x =>  `${x.title} \t ${x.date_watched}`).join('\n')}`);
    }
}