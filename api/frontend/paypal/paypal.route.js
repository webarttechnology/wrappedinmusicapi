
const {
  renderBuypage,
  sucesspage,
  cancelpage,
} = require("./paypal.controller");

const router = require("express").Router();
const {usercheckToken} =require("./../../../auth/token_validation");

router.post("/", usercheckToken, renderBuypage);
router.post("/success", usercheckToken, sucesspage);
router.post("/cancel", usercheckToken, cancelpage);


module.exports = router;