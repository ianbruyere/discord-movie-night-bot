const awake = require('./awake');

test('prefix matches', () => {
    expect(awake.prefix).toBe("!awake");
});
