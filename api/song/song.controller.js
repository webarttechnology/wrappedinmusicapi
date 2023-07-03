const Song = require("./song.service");
const Category = require("./../category/category.service");
const Subcategory = require("./../subcategory/subcategory.service");

Song.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Song, { foreignKey: "category_id" });

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");

const createSongs = async (req, res) => {
  const body = req.body;
  try {
    const duplicateCheck = await Song.findOne({
      where: {
        name: body.name,
        category_id: body.category_id,
        subcategory_id: body.subcategory_id,
      },
    });

    if(duplicateCheck === null){
        let filePath = "../../uploads/songs";
        var imagename = Date.now() + ".png";
        const imagepath = filePath + "/" + Date.now() + ".png";
        let buffer = Buffer.from(body.music_file.split(",")[1], "base64");
        fs.writeFileSync(path.join(__dirname, imagepath), buffer);
        body.music_file = "uploads/subcategory/" + imagename;

        const songs = await Song.create({
          name: body.name,
          category_id: body.category_id,
          subcategory_id: body.subcategory_id,
          description: body.description,
          music_file: body.music_file,
          is_active: "1",
        });

        if (songs) {
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
         msg: "Already exists this songs",
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
      const getallSongs = await Song.findAll({
        order: [["name", "ASC"]],
      });
      
      if (getallSongs !== null){
         return res.status(200).json({
           success: 1,
           data: getallSongs,
         });
      }else{
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
     const rowsDeleted = await Song.destroy({
       where: {
         id: req.params.id,
       },
     });

     if (rowsDeleted === 1) {
       return res.status(200).json({
         success: 1,
         msg: "Songs has been deleted",
       });
     } else {
       return res.status(200).json({
         success: 0,
         msg: "Record Not Found",
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
  createSongs: createSongs,
  updatesongs: updatesongs,
  getsongs: getsongs,
  getSongsbyCategory: getSongsbyCategory,
  getSongsbyID:getSongsbyID,
  deleteSongs: deleteSongs,
};
