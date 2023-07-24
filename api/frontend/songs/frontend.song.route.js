const { getAllsongs, songsSearch } = require("./frontend.song.controller");
const router = require("express").Router();

const { usercheckToken } = require("../../../auth/token_validation");

router.get("/", usercheckToken, getAllsongs);
router.post("/search-songs", usercheckToken, songsSearch);

module.exports = router;