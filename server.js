const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const UserRouter = require("./routes/UserRouter");
const CommentsRouter = require("./routes/CommentsRouter");
const BlogsRouter = require("./routes/BlogsRouter");
const ProductsRouter = require("./routes/ProductsRouter");
const OffsRouter = require("./routes/OffsRouter");
const locationRoute = require("./routes/LocationRouter");
const colorsRoute = require("./routes/ColorsRouter");
const categoryRoute = require("./routes/categoryRouter");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/users", UserRouter);
app.use("/comments", CommentsRouter);
app.use("/blogs", BlogsRouter);
app.use("/products", ProductsRouter);
app.use("/offs", OffsRouter);
app.use("/location", locationRoute);
app.use("/colors", colorsRoute);
app.use("/category", categoryRoute);

app.listen(4000); 