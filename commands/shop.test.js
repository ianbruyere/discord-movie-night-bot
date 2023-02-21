const shop = require('./shop')

test('prefix matches', () => {
    expect(shop.prefix).toBe("!shop");
});