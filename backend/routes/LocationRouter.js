const express = require("express");
const { databaseQueryHandler } = require("../utils");

const locationRoute = express.Router();

locationRoute.get("/city", (req, res) => {
  const getCitiesQuery = `SELECT * FROM city`;
  databaseQueryHandler(getCitiesQuery, res);
});

locationRoute.get("/province", (req, res) => {
  const getProvinceQuery = `SELECT * FROM province`;
  databaseQueryHandler(getProvinceQuery, res);
});

module.exports = locationRoute;
