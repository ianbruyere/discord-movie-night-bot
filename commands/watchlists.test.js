const watchlists = require('./watchlists')
var SequelizeMock = require('sequelize-mock');

// var dbMock = new SequelizeMock();

// var UserMock = dbMock.define('user', {
    
// })

test('prefix matches', () => {
    expect(watchlists.prefix).toBe("!watchlists");
});