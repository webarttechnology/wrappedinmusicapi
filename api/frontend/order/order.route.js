const {
  getOderByuser,

} = require("./order.controller");

const router = require("express").Router();

const { usercheckToken } = require("./../../../auth/token_validation");


router.get("/:id", usercheckToken, getOderByuser);

module.exports = router;