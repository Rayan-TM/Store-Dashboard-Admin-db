const shopDB = require("./db/database");

function databaseQueryHandler(query, response) {
  shopDB.query(query, (err, result) => {
    if (err) {
      response.send(err);
    } else {
      response.send(result);
    }
  });
}

// function separateCommentsByType(isProduct){
//   if(isProduct === 1){
//     const getAllProductsComments =
//   }
// }

module.exports = { databaseQueryHandler };
