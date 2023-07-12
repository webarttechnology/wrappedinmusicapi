const { createOrder, getOderByuser } = require("./order.controller");

const router = require("express").Router();

const { usercheckToken } = require("./../../../auth/token_validation");

router.post("/", usercheckToken, createOrder);
router.get("/:id", usercheckToken, getOderByuser);

module.exports = router;