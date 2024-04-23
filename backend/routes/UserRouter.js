const express = require("express");
const { databaseQueryHandler } = require("../utils");

const userRoute = express.Router();

userRoute.get("/", (req, res) => {
  const selectAllUsers = "SELECT * FROM users";
  databaseQueryHandler(selectAllUsers, res);
});

userRoute.post("/", (req, res) => {
  const body = req.body;
  const insertUser = `INSERT INTO users VALUES (NULL,'${body.firstname}','${body.lastname}','${body.username}','${body.password}',${body.phone},'${body.email}','${body.city}','${body.province}','${body.gender}')`;
  databaseQueryHandler(insertUser, res);
});

userRoute.put("/:userID", (req, res) => {
  const userID = req.params.userID;
  const body = req.body;
  const updateUser = `UPDATE users SET firstname='${body.firstname}',lastname='${body.lastname}',username='${body.username}',password='${body.password}',phone='${body.phone}',email='${body.email}',city='${body.city}',province='${body.province}',gender='${body.gender}' WHERE id=${userID}`;
  databaseQueryHandler(updateUser, res);
});

userRoute.delete("/:userID", (req, res) => {
  const userID = req.params.userID;
  const removeUser = `DELETE FROM users WHERE id=${userID}`;
  databaseQueryHandler(removeUser, res);
});

module.exports = userRoute;
