module.exports = {
 dateFormatter: (dateWatched) => {
    return `${dateWatched.toLocaleDateString("en-US", {year: "numeric"})}-` +
           `${dateWatched.toLocaleDateString("en-US", {month: "2-digit"})}-` +
           `${dateWatched.toLocaleDateString("en-US", {day: "2-digit"})}`
    }, 
}
