const grant = require('./grant')
var SequelizeMock = require('sequelize-mock');

// var dbMock = new SequelizeMock();

// var UserMock = dbMock.define('user', {
    
// })

test('prefix matches', () => {
    expect(grant.prefix).toBe("!grant");
});