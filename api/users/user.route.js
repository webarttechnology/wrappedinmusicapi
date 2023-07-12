const {
  createUser,
  otpVerification,
  login,
  forgotpassword,
  resetpassword,
  resendOtp,
  passwordChange,
  getUserbyId,
  profileEdit,
} = require("./user.controller");
const router = require("express").Router();

const { usercheckToken } = require("./../../auth/token_validation");
router.post("/", createUser);
router.post("/otp-verification", otpVerification);      
router.post("/resent-otp", resendOtp);
router.post("/login", login);
router.post("/forgotPassword", forgotpassword);
router.post("/reset-password", resetpassword);
router.post("/password-change",usercheckToken, passwordChange);
router.get("/:id", usercheckToken, getUserbyId);
router.patch("/user-update", usercheckToken, profileEdit);

module.exports = router;
