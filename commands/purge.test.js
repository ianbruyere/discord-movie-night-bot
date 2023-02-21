const purge = require('./purge')

test('prefix matches', () => {
    expect(purge.prefix).toBe("!purge");
});