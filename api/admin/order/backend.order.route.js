const { getAllOrder } = require("./backend.order.controller");

const router = require("express").Router();

const { checkToken } = require("./../../../auth/token_validation");

router.get("/:id",checkToken, getAllOrder);

module.exports = router;