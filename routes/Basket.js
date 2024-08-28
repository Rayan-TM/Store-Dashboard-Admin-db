const express = require("express");
const { databaseQueryHandler } = require("../utils");

const basketRouter = express.Router();

basketRouter.get("/:userID", (req, res) => {
  const userID = req.params.userID;

  const getBasketProducts = `SELECT * FROM basket WHERE userID = ${userID}`;

  databaseQueryHandler(getBasketProducts, res);
});

basketRouter.post("/:userID", (req, res) => {
  const userID = req.params.userID;
  const body = req.body;
  const insertNewProductToBasket = `INSERT INTO basket VALUES (NULL,${body.productID},${userID},'${body.productImg}','${body.productTitle}',${body.productPrice},'${body.productUrl}',${body.count})`;
  databaseQueryHandler(insertNewProductToBasket, res);
});

basketRouter.post("/:userID/:productID/:action/:count", (req, res) => {
  const { userID, productID, action, count } = req.params;

  const increaseProductCount = `UPDATE basket SET count = count ${
    action == 1 ? "+" : "-"
  } ${count} WHERE userID = ${userID} AND productID = ${productID}`;

  console.log('test', increaseProductCount)
  databaseQueryHandler(increaseProductCount, res);
});

basketRouter.delete("/:userID/:productID", (req, res) => {
  const userID = req.params.userID;
  const productID = req.params.productID;

  const removeProductFromBasket = `DELETE FROM basket WHERE userID = ${userID} AND productID = ${productID}`;
  databaseQueryHandler(removeProductFromBasket, res);
});

module.exports = basketRouter;
