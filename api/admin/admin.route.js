const {
  login,
  getUsers,
  usrdelete,
  userStatusChange,
} = require("./admin.controller");
const cors = require("cors");
const router = require("express").Router();

const { checkToken } = require("./../../auth/token_validation");

router.post("/login", login);
router.get("/get-user",  getUsers);
router.post("/delete-user", usrdelete);
router.post("/user-status-change", userStatusChange);
module.exports = router;
