const express = require("express");
const {databaseQueryHandler} = require('../utils')

const offRoute = express.Router();

offRoute.get("/", (req, res) => {
  const selectAllOffs = "SELECT offs.id, offs.discount_code, offs.discount_percent, offs.register_date, offs.expire_date, offs.isConfirmed, products.name as product_ID from offs INNER JOIN products ON products.id = product_ID";
  databaseQueryHandler(selectAllOffs, res)
});

offRoute.post("/", (req, res) => {
  const body = req.body;
  const insertOff = `INSERT INTO offs VALUES (NULL,${body.productId}, '${body.discountCode}', ${body.discountPercent}, '${body.registerDate}', '${body.expireDate}', ${body.isConfirmed})`;
  databaseQueryHandler(insertOff, res)
});

offRoute.put("/:offID/:isConfirmed", (req, res) => {
  const offID = req.params.offID;
  const isConfirmed = req.params.isConfirmed
  const updateOff = `UPDATE offs SET isConfirmed=${isConfirmed} WHERE id=${offID}`;
  databaseQueryHandler(updateOff, res)
});

offRoute.delete("/:offID", (req, res) => {
  const offID = req.params.offID;
  const removeOff = `DELETE FROM offs WHERE id=${offID}`;
  databaseQueryHandler(removeOff, res)
});

module.exports = offRoute;
