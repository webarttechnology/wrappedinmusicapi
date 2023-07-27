const {
  createSongs,
  updatesongs,
  getsongs,
  deleteSongs,
  getSongsbyCategory,
  getSongsbyID,
} = require("./song.controller");
const router = require("express").Router();
const multer = require("multer");

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

const { checkToken } = require("./../../auth/token_validation");


router.post("/",checkToken, upload.single("music_file"), errHandeler, createSongs);
router.get("/", checkToken, getsongs);
//router.get("/:id",checkToken, getSongsbyID);
router.get("/categorywise/:id",checkToken, getSongsbyCategory);
router.patch("/",checkToken, updatesongs);
router.delete("/:id",checkToken, deleteSongs);

module.exports = router;