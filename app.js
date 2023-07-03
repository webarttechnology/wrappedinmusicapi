require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");

const userRoute = require("./api/users/user.route");
const adminRoute = require("./api/admin/admin.route");
const categoryRoute = require("./api/category/category.route");
const subcategoryRoute = require("./api/subcategory/subcategory.route");
const songs = require("./api/song/song.route");
const script = require("./api/script/script.route");

app.use(express.json());

app.use(express.json({ limit: "90000mb", extended: true }));
app.use(
  express.urlencoded({
    limit: "90000mb",
    extended: true,
    parameterLimit: 90000,
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
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/category", categoryRoute);
app.use("/api/subcategory", subcategoryRoute);
app.use("/api/songs", songs);
app.use("/api/script", script);

const server = require("http").createServer(app);

server.listen(process.env.APP_PORT, () => {
  console.log(
    `Server is running at http://${process.env.DB_HOST}:${process.env.APP_PORT}`
  );
});
