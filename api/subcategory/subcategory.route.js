const {
  createsubcat,
  getSubcategory,
  categoryWiseShow,
  updateSubcategory,
  deleteSubcategory,
  subcatGetbyId,
  searchbyCategoryWise,
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

router.post("/",checkToken, upload.single("image"), errHandeler, createsubcat);
router.get("/",checkToken, getSubcategory);
router.get("/:id",checkToken, subcatGetbyId);
router.patch("/",checkToken, updateSubcategory);
router.delete("/:id",checkToken, deleteSubcategory);
router.get("/categorywise/:id", checkToken,categoryWiseShow);
router.post("/categorywise-search", checkToken, searchbyCategoryWise);
module.exports = router;
