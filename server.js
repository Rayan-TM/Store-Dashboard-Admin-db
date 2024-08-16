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
const managersRoute = require("./routes/Managers");
const qaRoute = require("./routes/QA");
const basketRouter = require("./routes/Basket");
const favoritesRouter = require("./routes/Favorites");
const feedbackRouter = require("./routes/Feedback");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/users", UserRouter);
app.use("/comments", CommentsRouter);
app.use("/blogs", BlogsRouter);
app.use("/products", ProductsRouter);
app.use("/offs", OffsRouter);
app.use("/location", locationRoute);
app.use("/colors", colorsRoute);
app.use("/category", categoryRoute);
app.use("/managers", managersRoute);
app.use("/qa", qaRoute);
app.use("/basket", basketRouter);
app.use("/favorites", favoritesRouter);
app.use("/feedbacks", feedbackRouter);

app.listen(4000);
