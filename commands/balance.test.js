const balance = require('./balance')
var SequelizeMock = require('sequelize-mock');

// var dbMock = new SequelizeMock();

// var UserMock = dbMock.define('user', {
    
// })

test('prefix matches', () => {
    expect(balance.prefix).toBe("!balance");
});