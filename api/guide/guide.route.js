const {
  createScript,
  getbyIdScript,
  getAllScript,
  categoryWiseScript,
  updateScript,
  deleteScript,
  // presetScriptAmountUpdate,
  // getAllPresetScriptAmt,
} = require("./guide.controller");
const cors = require("cors");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const { checkToken } = require("../../auth/token_validation");


router.post("/",checkToken, createScript);
router.get("/",checkToken, getAllScript);
router.get("/:id",checkToken, getbyIdScript);
router.get("/categorywise/:id",checkToken, categoryWiseScript);
router.patch("/",checkToken, deleteScript);
router.delete("/:id", checkToken, deleteScript);
// router.patch("/preset-script-amt", checkToken, presetScriptAmountUpdate);
// router.get("/preset-script-amt", checkToken, getAllPresetScriptAmt);

module.exports = router;
