const Song = require("./../../song/song.service");


const getAllsongs = async (req,res) =>{
        try {
            const allsongs = await Song.findAll({});
            if (allsongs !== null) {
              return res.status(200).json({
                success: 1,
                data: allsongs,
              });
            } else {
              return res.status(200).json({
                success: 0,
                data: "Data not found",
              });
            }
        } catch (e) {
          return res.status(409).json({
            success: 0,
            msg: e,
          });
        }
};


module.exports = {
  getAllsongs: getAllsongs,
};
