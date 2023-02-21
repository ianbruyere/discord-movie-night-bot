const help = require('./help')

test('prefix matches', () => {
    expect(help.prefix).toBe("!help");
});