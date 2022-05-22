const { Formatters } = require('discord.js');
const { ActionShop } = require('../dbObjects.js');
const { timeout } = require('../util/helpers.js');


module.exports = {
    prefix: "!shop",
    fn: async(msg) => {
        // shows whats in the shop and the cost
        const items = await ActionShop.findAll();
        return msg.reply(Formatters.codeBlock(items.map(i => `${i.name}---${i.cost}💰---${i.description}`).join('\n')))
        .then(timeout);
    }
}