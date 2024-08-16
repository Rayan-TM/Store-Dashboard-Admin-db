const express = require("express");
const { databaseQueryHandler } = require("../utils");

const productRoute = express.Router();

productRoute.get("/:productUrl?", (req, res) => {
  const productUrl = req.params.productUrl;
  const selectAllProducts = `SELECT * FROM products ${
    productUrl && `WHERE url='${productUrl}'`
  }`;
  databaseQueryHandler(selectAllProducts, res);
});

productRoute.get(
  "/page/:offset/:limit/:category/:filter/:search?",
  (req, res) => {
    const limit = req.params.limit;
    const offset = (req.params.offset - 1) * limit;
    const category = req.params.category;
    const search = req.params.search || "";
    let order = null;

    switch (req.params.filter) {
      case "Sort by latest": {
        order = "id DESC";
        break;
      }
      case "Sort by cheapest": {
        order = "price ASC";
        break;
      }
      case "Sort by most expensive": {
        order = "price DESC";
        break;
      }
      default: {
        order = "id ASC";
      }
    }

    const selectProductsOfPage = `SELECT * FROM products WHERE name LIKE '%${search}%' ${
      category !== "all" ? `AND category = '${category}'` : ""
    } ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`;
    databaseQueryHandler(selectProductsOfPage.trim(), res);
    console.log(selectProductsOfPage);
  }
);

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
