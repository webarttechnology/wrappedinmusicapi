const {
  createsubcat,
  getSubcategory,
  categoryWiseShow,
  updateSubcategory,
  deleteSubcategory,
  subcatGetbyId,
} = require("./subcategory.controller");
const cors = require("cors");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/subcategory",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  limits: { fieldSize: "10mb" },
  storage: storage,
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

router.post("/", upload.single("image"), errHandeler, createsubcat);
router.get("/", getSubcategory);
router.get("/:id", subcatGetbyId);
router.patch("/", updateSubcategory);
router.delete("/:id", deleteSubcategory);
router.get("/categorywise/:id", categoryWiseShow);
module.exports = router;
