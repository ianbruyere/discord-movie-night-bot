module.exports = {
 dateFormatter: (dateWatched) => {
    return `${dateWatched.toLocaleDateString("en-US", {year: "numeric"})}-` +
    `${dateWatched.toLocaleDateString("en-US", {month: "numeric"})}-` +
    `${dateWatched.toLocaleDateString("en-US", {day: "numeric"})}`
    }, 
}
