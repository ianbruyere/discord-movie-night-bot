var SequelizeMock = require('sequelize-mock');
var proxyquire = require('proxyquire');
const { Message } = require('discord.js');

var dbMock = new SequelizeMock();

var User_Movies = dbMock.define('user_movies', 
{ title: 'Chunking Express', user: "123", date_added: Date() },
{ title: 'The Room', user: "1234", date_added: Date() },
{ title: 'Misery', user: "1234", date_added: Date() },
{ title: 'Rear Window', user: "1234", date_added: Date() },
{ title: 'Super Mario Brothers (1993)', user: "1234", date_added: Date() },
{ title: 'The Graduate', user: "1234", date_added: Date() },
{ title: 'Modern Times', user: "1234", date_added: Date() },
{ title: 'Eyes Wide Shut', user: "1234", date_added: Date() },
{ title: 'Eraserhead', user: "1234", date_added: Date() },
{ title: 'Shaun of the Dead', user: "1234", date_added: Date() },
{ title: 'The Highlander', user: "1234", date_added: Date() },
{ title: 'Lawrence of Arabia', user: "1234", date_added: Date() },
)

var add_my_movie = proxyquire('./add_my_movie', {
    'User_Movies' : User_Movies
});

test('prefix matches', () => {
    expect(add_my_movie.prefix).toBe("!add_my_movie");
});

test('add movie successfully', () => {
    const inter = {
        reply: jest.fn(),
        author: {
            id: "123"
        }
    }
    const args = "The Shining".trim().split(/ +/g)
    add_my_movie.fn(inter, args).then( () => User_Movies.findAll({ where: { user: 123 } } )).then(function (user) {
        // either this isn't possible where the change persists as a result of the function call in the mocked database
        // or im missing something. its probably not even best practice what im trying to do
        // but my current 3am brain is saying that by calling the function im trying to see if it would write to the database
        // but i don't want to make an actual test database, but that might be the final call if mocks can't persist.
        expect(user.length).toBe(2)

    }).catch()
})