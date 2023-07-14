require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");

// admin Api
const userRoute = require("./api/users/user.route");
const adminRoute = require("./api/admin/admin.route");
const categoryRoute = require("./api/category/category.route");
const subcategoryRoute = require("./api/subcategory/subcategory.route");
const songs = require("./api/song/song.route");
const guide = require("./api/guide/guide.route");
const order = require("./api/admin/order/backend.order.route");

//frontend Api

const frontendCategoryRoute = require("./api/frontend/category/frontend.category.route");
const frontendSubcategoryRoute = require("./api/frontend/subcategory/frontend.subcategory.route");
const frontendGuideRoute = require("./api/frontend/guide/frontend.guide.route");
const orderRoute = require("./api/frontend/order/order.route");
const frontendsongRoute = require("./api/frontend/songs/frontend.song.route");

app.use(express.json());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json({ limit: "90000mb", extended: true }));
//app.use(express.bodyParser({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "90000mb",
    extended: true,
    parameterLimit: 900000000,
  })
);

// const upload = multer({
//   limits: { fieldSize: 25 * 1024 * 1024 },
// });

app.use(cors());
// app.use(upload.none());

// app.use(express.json({ limit: "10mb", extended: true }));
// app.use(
//   express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
// );
//Admin APi
app.use("/api/frontend/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/category", categoryRoute);
app.use("/api/subcategory", subcategoryRoute);
app.use("/api/songs", songs);
app.use("/api/guide", guide);
app.use("/api/order", order);

//Frontend APi
app.use("/api/frontend/category", frontendCategoryRoute);
app.use("/api/frontend/subcategory", frontendSubcategoryRoute);
app.use("/api/frontend/guide", frontendGuideRoute);
app.use("/api/frontend/order", orderRoute);
app.use("/api/frontend/song", frontendsongRoute);

const server = require("http").createServer(app);

server.listen(process.env.APP_PORT, () => {
  console.log(
    `Server is running at http://${process.env.DB_HOST}:${process.env.APP_PORT}`
  );
});
