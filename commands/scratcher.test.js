const scratcher = require('./scratcher');

test('prefix matches', () => {
    expect(scratcher.prefix).toBe("!scratcher");
});
