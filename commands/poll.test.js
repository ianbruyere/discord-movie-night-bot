const poll = require('./poll')

test('prefix matches', () => {
    expect(poll.prefix).toBe("!poll");
});