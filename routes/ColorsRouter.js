const express = require("express");
const { databaseQueryHandler } = require("../utils");

const colorsRoute = express.Router();

colorsRoute.get("/", (req, res) => {
  const getAllColorsQuery = `SELECT * FROM colors`;
  databaseQueryHandler(getAllColorsQuery, res);
});

module.exports = colorsRoute;
