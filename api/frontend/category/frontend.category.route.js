const { getcategory } = require("./frontend.category.controller");
const router = require("express").Router();
const { usercheckToken } = require("./../../../auth/token_validation");

router.get("/", usercheckToken, getcategory);

module.exports = router;
