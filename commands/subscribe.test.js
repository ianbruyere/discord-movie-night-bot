const subscribe = require('./subscribe')
var SequelizeMock = require('sequelize-mock');

// var dbMock = new SequelizeMock();

// var UserMock = dbMock.define('user', {
    
// })

test('prefix matches', () => {
    expect(subscribe.prefix).toBe("!subscribe");
});