const express = require("express");
const { databaseQueryHandler } = require("../utils");

const productRoute = express.Router();

productRoute.get("/:productID?", (req, res) => {
  const productID = req.params.productID;
  const selectAllProducts = `SELECT * FROM products ${
    productID && "WHERE id=" + productID
  }`;
  databaseQueryHandler(selectAllProducts, res);
});

productRoute.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  const insertProduct = `INSERT INTO products VALUES (NULL, '${body.name}',${body.price}, '${body.category}', '${body.description}', '${body.colors}', '${body.image}','${body.album}',${body.status}, ${body.isAvailable}, ${body.allowComment})`;
  databaseQueryHandler(insertProduct, res);
});

productRoute.put("/:productID", (req, res) => {
  const productID = req.params.productID;
  const body = req.body;
  const updateProduct = `UPDATE products SET name="${body.name}",price=${body.price},category="${body.category}",description="${body.description}", colors='${body.colors}',image="${body.image}",album="${body.album}" ,status=${body.status},isAvailable=${body.isAvailable}, allowComment=${body.allowComment} WHERE id=${productID}`;
  databaseQueryHandler(updateProduct, res);
});

productRoute.delete("/:productID", (req, res) => {
  const productID = req.params.productID;
  const removeProduct = `DELETE FROM products WHERE id=${productID}`;
  databaseQueryHandler(removeProduct, res);
});
  
module.exports = productRoute;
