const { getAllsongs } = require("./frontend.song.controller");
const router = require("express").Router();

const { usercheckToken } = require("../../../auth/token_validation");

router.get("/", usercheckToken, getAllsongs);

module.exports = router;