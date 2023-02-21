const buy = require('./buy')

var SequelizeMock = require('sequelize-mock');

// var vbMock = new SequelizeMock();

// var UserMock = dbMock.define('user', {

// })

test('prefix matches', () => {
    expect(buy.prefix).toBe("!buy");
});