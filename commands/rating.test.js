const rating = require('./rating')

test('prefix matches', () => {
    expect(rating.prefix).toBe("!rating");
});