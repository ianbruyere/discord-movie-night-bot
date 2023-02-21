const watchlist = require('./watchlist')
var SequelizeMock = require('sequelize-mock');

// var dbMock = new SequelizeMock();

// var UserMock = dbMock.define('user', {
    
// })

test('prefix matches', () => {
    expect(watchlist.prefix).toBe("!watchlist");
});