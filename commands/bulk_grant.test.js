const bulk_grant = require('./bulk_grant')

var SequelizeMock = require('sequelize-mock');

// var vbMock = new SequelizeMock();

// var UserMock = dbMock.define('user', {

// })

test('prefix matches', () => {
    expect(bulk_grant.prefix).toBe("!bulk_grant");
});