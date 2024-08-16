const express = require("express");
const { databaseQueryHandler } = require("../utils");

const userRoute = express.Router();

userRoute.get("/:userToken?", (req, res) => {
  const userToken = req.params.userToken;
  const selectAllUsers = `SELECT * FROM users ${
    userToken && `WHERE token = '${userToken}'`
  }`;
  databaseQueryHandler(selectAllUsers, res);
});

userRoute.get("/:username/:password", (req, res) => {
  const username = req.params.username;
  const password = req.params.password;

  const selectUserByToken = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  console.log(selectUserByToken);

  databaseQueryHandler(selectUserByToken, res);
});

userRoute.post("/", (req, res) => {
  const body = req.body;
  const insertUser = `INSERT INTO users VALUES (NULL,'','','${body.username}','${body.password}',0,'','','','','', '${body.token}')`;
  databaseQueryHandler(insertUser, res);
});

userRoute.put("/:userID", (req, res) => {
  const userID = req.params.userID;
  const body = req.body;
  const updateUser = `UPDATE users SET firstname='${body.firstname}',lastname='${body.lastname}',username='${body.username}',phone='${body.phone}',email='${body.email}',city='${body.city}',province='${body.province}',gender='${body.gender}' WHERE id=${userID}`;
  databaseQueryHandler(updateUser, res);
});

userRoute.put("/change-password/:userID", (req, res) => {
  const userID = req.params.userID;
  const updateUser = `UPDATE users SET password='${req.body.password}' WHERE id=${userID}`;
  databaseQueryHandler(updateUser, res);
});

userRoute.delete("/:userID", (req, res) => {
  const userID = req.params.userID;
  const removeUser = `DELETE FROM users WHERE id=${userID}`;
  databaseQueryHandler(removeUser, res);
});

module.exports = userRoute;
