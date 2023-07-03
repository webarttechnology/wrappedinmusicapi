const {
  createScript,
  getbyIdScript,
  getAllScript,
  categoryWiseScript,
  updateScript,
  deleteScript,
} = require("./script.controller");
const cors = require("cors");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");



router.post("/", createScript);
router.get("/", getAllScript);
router.get("/:id", getbyIdScript);
router.get("/categorywise/:id", categoryWiseScript);
router.patch("/", updateScript);
router.delete("/:id", deleteScript);

module.exports = router;
