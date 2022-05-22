require('dotenv').config();

module.exports = {
 dateFormatter: (dateWatched) => {
    return `${dateWatched.toLocaleDateString("en-US", {year: "numeric"})}-` +
           `${dateWatched.toLocaleDateString("en-US", {month: "2-digit"})}-` +
           `${dateWatched.toLocaleDateString("en-US", {day: "2-digit"})}`
    },
    timeout: async (sentMessage) => {
       const command = await sentMessage.channel.messages.fetch(sentMessage.reference.messageId)
       setTimeout(() => {
              sentMessage.delete()
              command.delete()
       }, 180000);
    },
    removeArticles: (movie_title) => {
           const articles = ["the", "a", "an"]
           arr_movie_title = movie_title.split(' ')
           let filtered = arr_movie_title.filter(item => !articles.includes(item.toLowerCase()))
           return filtered.join(' ')
    },

    purgeExclude: (content) => {
           const firstWord = content.split(' ')[0]
           return process.env.PURGE_EXCLUDE.includes(firstWord)
    }
}