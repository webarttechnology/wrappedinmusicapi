const {
  createSongs,
  updatesongs,
  getsongs,
  deleteSongs,
  getSongsbyCategory,
} = require("./song.controller");
const cors = require("cors");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const upload = multer({
  limits: { fieldSize: "10mb" },
});

function errHandeler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      msg: err.message,
    });
  }
}


router.post("/", upload.single("music_file"), errHandeler, createSongs);
router.get("/", getsongs);
router.get("/:id", getSongsbyCategory);
router.patch("/", updatesongs);
router.delete("/:id", deleteSongs);

module.exports = router;