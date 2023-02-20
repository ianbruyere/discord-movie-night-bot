// TODO make common actions so as not to clutter
require('dotenv').config();
const { User_Movies, Users, ActionShop } = require('../dbObjects.js');



// module.exports = {
//     adj_bal : async (id, amt) => {        
//     // subtract from balance 
//             await Users.increment({balance : amt}, {
//                 where: {
//                   id: id
//                 }
//               }
//             )
//             }
//         }
    