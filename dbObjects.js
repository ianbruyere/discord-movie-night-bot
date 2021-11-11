require('dotenv').config();
const { default: Collection } = require('@discordjs/collection');
const Sequelize = require('sequelize');

// connection information
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: process.env.DATABASE_PATH
  })

const Movies = require('./models/Movie.js')(sequelize, Sequelize.DataTypes)
const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes)
const ActionShop = require('./models/ActionShop.js')(sequelize, Sequelize.DataTypes)
const currency = new Collection()

Reflect.defineProperty(currency, 'add', {
	/* eslint-disable-next-line func-name-matching */
	value: async function add(id, amount) {
		const user = currency.get(id);

		if (user) {
			user.balance += Number(amount);
			return user.save();
		}

		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);

		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	/* eslint-disable-next-line func-name-matching */
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});


module.exports = { Movies, Users, ActionShop, currency }