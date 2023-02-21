const the_plan = require('./the_plan')

test('prefix matches', () => {
    expect(the_plan.prefix).toBe("!the_plan");
});