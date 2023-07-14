const {
  login,
  getUsers,
  usrdelete,
  userStatusChange,
} = require("./admin.controller");
const router = require("express").Router();

const { checkToken } = require("./../../auth/token_validation");

router.post("/login", login);
router.get("/get-user", checkToken,  getUsers);
router.delete("/delete-user/:id", checkToken, usrdelete);
router.post("/user-status-change",checkToken, userStatusChange);
module.exports = router;
