const express = require("express");
const { databaseQueryHandler } = require("../utils");

const blogRoute = express.Router();

blogRoute.get("/:blogUrl?", (req, res) => {
  const blogUrl = req.params.blogUrl;
  const selectAllBlogs = `SELECT * FROM blogs ${
    blogUrl && `WHERE url='${blogUrl}'`
  }`;
  databaseQueryHandler(selectAllBlogs, res);
});

blogRoute.get("/page/:offset/:limit/:category/:search?", (req, res) => {
  const limit = req.params.limit;
  const offset = (req.params.offset - 1) * limit;
  const category = req.params.category;
  const search = req.params.search || "";

  const selectBlogsOfPage = `SELECT * FROM blogs WHERE title LIKE '%${search}%' ${
    category !== "all" ? `AND category = '${category}'` : ""
  } LIMIT ${limit} OFFSET ${offset}`;

  databaseQueryHandler(selectBlogsOfPage, res);
});

blogRoute.post("/", (req, res) => {
  const body = req.body;
  const insertBlog = `INSERT INTO blogs VALUES (NULL,'${body.title}','${body.image}','${body.content}','${body.date}','${body.hour}','${body.category}', ${body.status}, ${body.allowComment})`;
  databaseQueryHandler(insertBlog, res);
});

blogRoute.put("/:blogID", (req, res) => {
  const blogID = req.params.blogID;
  const body = req.body;
  const updateBlog = `UPDATE blogs SET title='${body.title}',image='${body.image}',content='${body.content}',category='${body.category}',status=${body.status} WHERE id=${blogID}`;
  databaseQueryHandler(updateBlog, res);
});

blogRoute.delete("/:blogID", (req, res) => {
  const blogID = req.params.blogID;
  const removeBlog = `DELETE FROM blogs WHERE id=${blogID}`;
  databaseQueryHandler(removeBlog, res);
});

module.exports = blogRoute;
