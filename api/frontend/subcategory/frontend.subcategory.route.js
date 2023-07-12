const {
  getSubcategory,
  categoryWiseShow,
  subcatGetbyId,
} = require("./frontend.subcategory.controller");
const router = require("express").Router();

const { usercheckToken } = require("./../../../auth/token_validation");

router.get("/", usercheckToken, getSubcategory);
router.get("/:id", usercheckToken, subcatGetbyId);
router.post("/categorywise", usercheckToken, categoryWiseShow);
module.exports = router;
