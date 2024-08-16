const express = require("express");
const { databaseQueryHandler } = require("../utils");

const favoritesRouter = express.Router();

favoritesRouter.get("/:userID", (req, res) => {
  const userID = req.params.userID;

  const selectAllFavoriteProducts = `SELECT * FROM favorites WHERE userID = ${userID}`;

  databaseQueryHandler(selectAllFavoriteProducts, res);
});

favoritesRouter.post("/:userID", (req, res) => {
  const userID = req.params.userID;
  const body = req.body;
  const insertProductToFavorites = `INSERT INTO favorites VALUES (NULL,${userID},${body.productID},'${body.productImg}','${body.productTitle}',${body.productPrice},'${body.productUrl}')`;
  databaseQueryHandler(insertProductToFavorites, res);
});

favoritesRouter.delete("/:userID/:productID", (req, res) => {
  const userID = req.params.userID;
  const productID = req.params.productID;

  const removeProductFromFavorites = `DELETE FROM favorites WHERE userID = ${userID} AND productID = ${productID}`;
  databaseQueryHandler(removeProductFromFavorites, res);
});

module.exports = favoritesRouter;
