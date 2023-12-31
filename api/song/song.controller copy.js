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
    const mood = body.mood;
    const occasion = body.occasion;
    const genre = body.genre;

    const songDuplicateCheck = await Song.findOne({
      where: { name: body.name },
    });

    if (songDuplicateCheck === null) {
      //  body.subcategory_id = body.subcategory_id.split(",");
      //mp3 songs uploads
      let filePath = "./../../uploads/songs";
      var songname = Date.now() + ".mp3";
      const songpath = filePath + "/" + Date.now() + ".mp3";
      let sbuffer = Buffer.from(body.music_file.split(",")[1], "base64");
      fs.writeFileSync(path.join(__dirname, songpath), sbuffer);
      body.music_file = "uploads/songs/" + songname;
      //songs thum upload
      let ifilePath = "./../../uploads/songs/image";
      var imagename = Date.now() + ".png";
      const imagepath = ifilePath + "/" + Date.now() + ".png";
      let buffer = Buffer.from(body.image.split(",")[1], "base64");
      fs.writeFileSync(path.join(__dirname, imagepath), buffer);
      body.image = "uploads/songs/image/" + imagename;

      //insert in song table
      var songs = await Song.create({
        name: body.name,
        description: body.description,
        duration: body.duration,
        amount: body.amount,
        music_file: body.music_file,
        image: body.image,
        is_active: "1",
      });
      //song cat table multiple cat insert
      var musicArray = [];
      mood.map((item, key) => {
        var MoodSongs = {
          song_id: songs.id,
          category_id: 3,
          subcategory_id: item,
        };
        musicArray.push(MoodSongs);
      });

        occasion.map((item, key) => {
          var OccasionSongs = {
            song_id: songs.id,
            category_id: 2,
            subcategory_id: item,
          };
          musicArray.push(OccasionSongs);
        });

          genre.map((item, key) => {
            var GenreSongs = {
              song_id: songs.id,
              category_id: 1,
              subcategory_id: item,
            };
            musicArray.push(GenreSongs);
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
    } else {
      return res.status(200).json({
        success: 0,
        msg: "Already exists song name",
      });
    }
  }catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const updatesongs = async (req, res) => {
  const body = req.body;
  try {
       const subcategory_id = body.subcategory_id;

       const songDuplicateCheck = await Song.findOne({
         where: { name: body.name, id: { $not: body.id } },
       });

       if (songDuplicateCheck === null) {
          //mp3 songs uploads
          if(body.music_file){
             let filePath = "./../../uploads/songs";
             var songname = Date.now() + ".mp3";
             const songpath = filePath + "/" + Date.now() + ".mp3";
             let sbuffer = Buffer.from(body.music_file.split(",")[1], "base64");
             fs.writeFileSync(path.join(__dirname, songpath), sbuffer);
             body.music_file = "uploads/songs/" + songname;
              var songs = await Song.update(
                {
                  name: body.name,
                  description: body.description,
                  duration: body.duration,
                  amount: body.amount,
                  music_file: body.music_file,
                  // image: body.image,
                  is_active: "1",
                },
                { where: { id: body.id } }
              );
         }
         //songs thum upload
         if(body.image){
             let ifilePath = "./../../uploads/songs/image";
             var imagename = Date.now() + ".png";
             const imagepath = ifilePath + "/" + Date.now() + ".png";
             let buffer = Buffer.from(body.image.split(",")[1], "base64");
             fs.writeFileSync(path.join(__dirname, imagepath), buffer);
             body.image = "uploads/songs/image/" + imagename;
               var songs = await Song.update(
                 {
                   name: body.name,
                   description: body.description,
                   duration: body.duration,
                   amount: body.amount,
                  // music_file: body.music_file,
                    image: body.image,
                   is_active: "1",
                 },
                 { where: { id: body.id } }
               );
         }
         // Not complete update in songCategory table
         if(songs){
             var musicArray = [];
             subcategory_id.map((item, key) => {
               var songsModel = {
                 category_id: body.category_id,
                 subcategory_id: item,
               };
               musicArray.push(songsModel);
             });
            var songscat = Songcategory.bulkUpdate(musicArray);
             if(songscat){
                return res.status(200).json({
                  success: 1,
                  msg: "Data has been updated",
                });
             }else{
                return res.status(200).json({
                  success: 0,
                  msg: "Some error. Please try again ",
                });
              }
         }
       }else {
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


const getsongs = async (req, res) => {
 // try {
    const allsongs = await Song.findAll({
      attributes: ["name", "id"],
      include: [
        {
          model: Songcategory,
          attributes: ["id",],
          required: true,
          include: [
            {
              model: Category,
              attributes: ["name"],
              required: true,
            },
            {
              model: Subcategory,
              attributes: ["name"],
              required: true,
            },
          ],
        },
      ],
    });

    const category = await Category.findAll({
      attributes: ["name", "id"],
    });


    var songArray = [];
    category.map(async (cat, index) => {
       var song = await Song.findAll({
         attributes: ["name", "id"],
         include: [
           {
             model: Songcategory,
             attributes: ["id","category_id"],
             where: {category_id: cat.id},
             required: true,
           },
         ],
       });
       songArray.push(allsongs);
     //  console.log(song);
     

      //  if (cat.id in songArray.Songcategories.category_id) {
      //    songArray.push(song);
      //  } 
      //  else {
      //    songArray[cat.id] = {
      //      song: song,
      //    };
      //  }
    });

      return res.status(200).json({
        success: 0,
        msg: allsongs,
      });

   

  // } catch (e) {
  //   return res.status(409).json({
  //     success: 0,
  //     msg: e,
  //   });
  // }
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

const getSongsbyID = async (req, res) => {
  try {
    const getallSongs = await Song.findOne({
      where: { id: req.params.id },
      attributes: [
        "id",
        "name",
        "description",
        "duration",
        "amount",
        "music_file",
        "image",
        "is_active"
      ],
      include: [
        {
          model: Songcategory,
          required: true,
          attributes: ["id"],
          include: [
            {
              model: Subcategory,
              required: true,
              attributes: ["id", "name"],
            },
            {
              model: Category,
              required: true,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
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
};

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
  getSongsbyID: getSongsbyID,
  deleteSongs: deleteSongs,
};
