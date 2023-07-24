
const {  getcategory } = require("./category.controller");
const router = require("express").Router();
const { checkToken } = require("./../../auth/token_validation");

router.get("/",checkToken, getcategory);

module.exports =router;