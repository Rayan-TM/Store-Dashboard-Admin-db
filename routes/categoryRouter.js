const express = require("express");
const { databaseQueryHandler } = require("../utils");

const categoryRoute = express.Router();

categoryRoute.get("/:isProduct", (req, res) => {
  const isProduct = req.params.isProduct;
  const getAllCategories = `SELECT * from category WHERE isProduct = ${isProduct}`;

  databaseQueryHandler(getAllCategories, res);
});

module.exports = categoryRoute;
