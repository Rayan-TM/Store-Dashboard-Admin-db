const express = require("express");
const { databaseQueryHandler } = require("../utils");

const commentRoute = express.Router();

commentRoute.get("/:isProduct?", (req, res) => {
  const isProduct = req.params.isProduct;
  const baseQuery =
    "SELECT comments.id, comments.isProduct, comments.category, comments.content, comments.isReply, comments.reply_ID, comments.isConfirmed, comments.date, comments.hour, users.username AS user_ID, products.name as content_ID FROM comments INNER JOIN users ON users.id = comments.user_ID INNER JOIN products ON products.id = comments.content_ID";
  let selectAllComments = null;

  if (isProduct === undefined) {
    selectAllComments = baseQuery;
  } else {
    selectAllComments = `${baseQuery} WHERE isProduct = ${isProduct}`;
  }

  databaseQueryHandler(selectAllComments, res);
});

commentRoute.get("/content/:isProduct/:commentID", (req, res) => {
  const isProduct = req.params.isProduct;
  const commentID = req.params.commentID;

  const getCommentQuery = `SELECT * FROM comments WHERE id = ${commentID} AND isProduct = ${isProduct}`;

  databaseQueryHandler(getCommentQuery, res);
});

commentRoute.post("/", (req, res) => {
  const body = req.body;
  const insertComment = `INSERT INTO comments VALUES (NULL, ${body.isProduct},${body.userID}, ${body.contentID},'${body.category}','${body.content}', ${body.isReply}, ${body.replyID},${body.isConfirmed}, '${body.date}','${body.hour}')`;
  databaseQueryHandler(insertComment, res);
});

commentRoute.put("/edit/:commentID", (req, res) => {
  const commentID = req.params.commentID;
  console.log(req.body.content);
  const updateComment = `UPDATE comments SET content='${req.body.content}' WHERE id=${commentID}`;
  databaseQueryHandler(updateComment, res);
});

commentRoute.put("/:commentID/:isConfirmed", (req, res) => {
  const commentID = req.params.commentID;
  const isConfirmed = req.params.isConfirmed;
  const updateComment = `UPDATE comments SET isConfirmed=${isConfirmed} WHERE id=${commentID}`;
  databaseQueryHandler(updateComment, res);
});

commentRoute.delete("/:commentID", (req, res) => {
  const commentID = req.params.commentID;
  const removeComment = `DELETE FROM comments WHERE id=${commentID}`;
  databaseQueryHandler(removeComment, res);
});

module.exports = commentRoute;
