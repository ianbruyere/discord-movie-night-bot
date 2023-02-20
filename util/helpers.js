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
              console.log(command)
              sentMessage.delete()
              // command.delete()
       }, 360000);
    },
    removeArticles: (movie_title) => {
           const articles = ["the", "a", "an"]
           console.log(movie_title)
           let arr_movie_title = movie_title.split(' ')
           let filtered = arr_movie_title.filter(item => !articles.includes(item.toLowerCase()))
           return filtered.join(' ')
    },

    purgeExclude: (content) => {
           const firstWord = content.split(' ')[0]
           return process.env.PURGE_EXCLUDE.includes(firstWord)
    },

    discordCharLimit: (msgArr) => {
       while(msgArr.length > 0) {
              currMsg += msgArr.shift() + "\n"
              if (currMsg.length > 1900) {
                  inter.reply(Formatters.codeBlock(currMsg)).then(timeout)
                  currMsg = ""
              }
       }
     },
     get_current_mem_ids: (inter, chat_id) => {
       const channel = inter.guild.channels.cache.get(chat_id)
       const members =  channel.members
       // returns as an array
       return Array.from(members.keys())
     },

     get_username: async (inter, id) => {
       const mems =  await inter.guild.members.fetch()
       const name = await mems.get(id).user.username
       return name
     },

     can_buy: async(user, item) => {
       if (item.cost > user.balance) {
              inter.reply(`You currently have ${user.balance}, but the ${item.name} costs ${item.cost}!`);
              return false
          }
       return true
     },

     buy_action: async(user, item) => {       
       user.balance -= item.cost;
       await user.save();
     },

     command_completion: (command) => {
       console.log(`${command} has Completed!`)
     }

}