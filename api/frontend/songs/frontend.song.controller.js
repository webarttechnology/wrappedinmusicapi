const Song = require("./../../song/song.service");
const SongCategory = require("./../../song/songcategory.service");
const Category = require("./../../category/category.service");
const Subcategory = require("./../../subcategory/subcategory.service");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

SongCategory.belongsTo(Song, { foreignKey: "song_id" });
Song.hasMany(SongCategory, { foreignKey: "song_id" });

SongCategory.belongsTo(Subcategory, { foreignKey: "subcategory_id" });
Subcategory.hasMany(SongCategory, { foreignKey: "subcategory_id" });

SongCategory.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(SongCategory, { foreignKey: "category_id" });


const getAllsongs = async (req,res) =>{
        try {
            const allsongs = await Song.findAll({
              attributes: [
                "id",
                "name",
                "music_file",
                "description",
                "duration",
                "amount",
                "image",
              ],
              include: [
                {
                  model: SongCategory,
                  attributes: ["id"],
                  required: true,
                  include: [
                    {
                      model: Subcategory,
                      attributes: ["name"],
                      required: true,
                      include: [],
                    },
                    {
                      model: Category,
                      attributes: ["name"],
                      required: true,
                      include: [],
                    },
                  ],
                },
              ],
            });
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

const songsSearch = async (req,res) => {
    const body = req.body;
    try {
        if(body.searchterm !== ""){
             const songs = await Song.findAndCountAll({
               where: { name: { [Op.like]:  body.searchterm + "%" } },
               attributes: [
                 "id",
                 "name",
                 "music_file",
                 "description",
                 "duration",
                 "amount",
                 "image",
               ],
               include: [
                 {
                   model: SongCategory,
                   attributes: ["id"],
                   required: true,
                   include: [
                     {
                       model: Subcategory,
                       attributes: ["name"],
                       required: true,
                       include: [],
                     },
                     {
                       model: Category,
                       attributes: ["name"],
                       required: true,
                       include: [],
                     },
                   ],
                 },
               ],
             });
             if (songs.count !== 0) {
               return res.status(200).json({
                 success: 1,
                 data: songs.rows,
               });
             }else {
               return res.status(409).json({
                 success: 0,
                 msg: "Data not found",
               });
             }
        }else{
            return res.status(200).json({
              success: 0,
              data: "Data Not found",
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
  songsSearch: songsSearch,
};
