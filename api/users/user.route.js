const {
  createUser,
  otpVerification,
  login,
  forgotpassword,
  resetpassword,
  resendOtp,
} = require("./user.controller");
const cors = require("cors");
const router = require("express").Router();

//const { checkToken } = require("../../auth/token_validation");
router.post("/", createUser);
router.post("/otp-verification", otpVerification);      
router.post("/resent-otp", resendOtp);
router.post("/login", login);
router.post("/forgotPassword", forgotpassword);
router.post("/reset-password", resetpassword);

module.exports = router;
