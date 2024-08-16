const express = require("express");
const { databaseQueryHandler } = require("../utils");

const qaRoute = express.Router();

qaRoute.get("/", (req, res) => {
  const getAllQA = "SELECT * FROM qa";
  databaseQueryHandler(getAllQA, res);
});

module.exports = qaRoute