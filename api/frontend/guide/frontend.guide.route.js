const { getAllScript } = require("./frontend.guide.controller");

const router = require("express").Router();

const { usercheckToken } = require("../../../auth/token_validation");

router.get("/", usercheckToken, getAllScript);

module.exports = router;
