const express = require("express");
const { databaseQueryHandler } = require("../utils");

const feedbackRouter = express.Router();

feedbackRouter.get("/", (req, res) => {
  const getAllFeedbacks = "SELECT * FROM feedback";

  databaseQueryHandler(getAllFeedbacks, res);
});

feedbackRouter.post("/", (req, res) => {
  const body = req.body;
  const sendFeedback = `INSERT INTO feedback VALUES (NULL,'${body.email}','${body.phone}','${body.message}')`;

  databaseQueryHandler(sendFeedback, res);
});


module.exports = feedbackRouter
