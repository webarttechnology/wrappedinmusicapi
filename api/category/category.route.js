
const {  getcategory } = require("./category.controller");
const cors = require("cors");
const router = require("express").Router();
const { checkToken } = require("./../../auth/token_validation");

router.get("/", getcategory);

module.exports =router;