const Song = require("./song.service");
const Category = require("./../category/category.service");
const Subcategory = require("./../subcategory/subcategory.service");
const Songcategory = require("./songcategory.service");

Subcategory.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Subcategory, { foreignKey: "category_id" });

Songcategory.belongsTo(Song, { foreignKey: "song_id" });
Song.hasMany(Songcategory, { foreignKey: "song_id" });


Songcategory.belongsTo(Subcategory, { foreignKey: "subcategory_id" });
Subcategory.hasMany(Songcategory, { foreignKey: "subcategory_id" });

Songcategory.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Songcategory, { foreignKey: "category_id" });





const Joi = require("joi");
const fs = require("fs");
const path = require("path");

const createSongs = async (req, res) => {
  const body = req.body;
  
  try {
    const subcategory_id = body.subcategory_id;

    const songDuplicateCheck = await Song.findOne({
        where : {name : body.name}
    });

    if(songDuplicateCheck === null){
      //  body.subcategory_id = body.subcategory_id.split(",");

      // const duplicateCheck = await Song.findOne({
      //   where: {
      //     name: body.name,
      //   },
      // });

      // if(duplicateCheck === null){
      let filePath = "../../uploads/songs";
      var imagename = Date.now() + ".mp3";
      const imagepath = filePath + "/" + Date.now() + ".mp3";
      let buffer = Buffer.from(body.music_file.split(",")[1], "base64");
      fs.writeFileSync(path.join(__dirname, imagepath), buffer);
      body.music_file = "uploads/songs/" + imagename;

      var songs = await Song.create({
        name: body.name,
        description: body.description,
        duration: body.duration,
        amount: body.amount,
        music_file: body.music_file,
        is_active: "1",
      });

      var musicArray = [];

      subcategory_id.map((item, key) => {
        var songsModel = {
          song_id: songs.id,
          category_id: body.category_id,
          subcategory_id: item,
        };
        musicArray.push(songsModel);
      });

      var songscat = Songcategory.bulkCreate(musicArray);
      if (songscat) {
        return res.status(200).json({
          success: 1,
          msg: "Data has been added successfully.",
          data: songs,
        });
      } else {
        return res.status(200).json({
          success: 0,
          msg: "Insert error. Please try again",
        });
      }
    
    }else{
       return res.status(200).json({
         success: 0,
         msg: "Already exists song name",
       });
    }
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const updatesongs = async (req, res) => {
  const body = req.body;
  try {
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const getsongs = async (req, res) => {
 try {
 const songData = await Song.findAll({
   attributes: ["id", "name", "duration","amount", "music_file", "description"],
   include: [
     {
       model: Songcategory,
       attributes: ["id"],
       required: true,
       include: [
         {
           model: Subcategory,
           required: true,
           attributes: ["name"],
         },
         {
           model: Category,
           required: true,
           attributes: ["name"],
         },
       ],
     },
   ],
 });

 

 if (songData !== null){
        return res.status(200).json({
          success: 1,
          data: songData,
        }); 
 }else{
     return res.status(200).json({
       success: 1,
       msg:"Data not found" ,
     }); 
 }
    
       
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const getSongsbyCategory = async (req, res) => {
  try {
     const getallSongs = await Song.findAndCountAll({
       where: { category_id: req.params.id },
       order: [["name", "ASC"]],
     });

     if (getallSongs.count !== 0) {
       return res.status(200).json({
         success: 1,
         data: getallSongs,
       });
     } else {
       return res.status(200).json({
         success: 0,
         msg: "Data Not found!!",
       });
     }
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const getSongsbyID = async (req,res) =>{
    try {
       const getallSongs = await Song.findOne({
         where: { id: req.params.id },
       });

       if (getallSongs !== null) {
         return res.status(200).json({
           success: 1,
           data: getallSongs,
         });
       } else {
         return res.status(200).json({
           success: 0,
           msg: "Data Not found!!",
         });
       }
    } catch (e) {
      return res.status(409).json({
        success: 0,
        msg: e,
      });
    }
}

const deleteSongs = async (req, res) => {
  try {

     const catSongDeleted = await Songcategory.destroy({
       where: {
         song_id: req.params.id,
       },
     });

    // if (catSongDeleted === 1) {
       const rowsDeleted = await Song.destroy({
         where: {
           id: req.params.id,
         },
       });

       return res.status(200).json({
         success: 1,
         msg: "Songs has been deleted",
       });
    //  } else {
    //    return res.status(200).json({
    //      success: 0,
    //      msg: "Record Not Found",
    //    });
    //  }
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};


module.exports = {
  createSongs: createSongs,
  updatesongs: updatesongs,
  getsongs: getsongs,
  getSongsbyCategory: getSongsbyCategory,
  getSongsbyID:getSongsbyID,
  deleteSongs: deleteSongs,
};
