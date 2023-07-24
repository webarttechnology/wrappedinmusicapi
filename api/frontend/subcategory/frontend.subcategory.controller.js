const subcategory = require("./../../subcategory/subcategory.service");
const Song = require("./../../song/song.service");
const Category = require("./../../category/category.service");
const Songcategory = require("./../../song/songcategory.service");
const Order = require("./../../frontend/order/order.service");

subcategory.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(subcategory, { foreignKey: "category_id" });

Order.belongsTo(Song, { foreignKey: "song_id" });
Song.hasMany(Order, { foreignKey: "song_id" });

// Song.belongsTo(Songcategory, { foreignKey: "song_id" });
// Songcategory.hasMany(Song, { foreignKey: "song_id" });

Songcategory.belongsTo(Song, { foreignKey: "song_id" });
Song.hasMany(Songcategory, { foreignKey: "song_id" });

Songcategory.belongsTo(subcategory, { foreignKey: "subcategory_id" });
subcategory.hasMany(Songcategory, { foreignKey: "subcategory_id" });

Songcategory.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Songcategory, { foreignKey: "category_id" });

const crypto = require("crypto");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");

const subcatGetbyId = async (req, res) => {
  try {
    const checkSubcat = await Songcategory.findOne({
      where: { subcategory_id: req.params.id },
    });
  
    // check song avalible or not 
    if (checkSubcat !== null) {
      const song = await Songcategory.findAll({
        where: { subcategory_id: req.params.id },
        attributes: ["id"],
        include: [
          {
            model: Song,
            attributes: [
              "id",
              ["name", "title"],
              ["music_file", "url"],
              ["image", "artwork"],
              "description",
              "duration",
              "amount",
              "is_active",
            ],
            required: true,
          },
          {
            model: subcategory,
            attributes: [
              "id",
              "name",
              "category_id",
              "name",
              "details",
              "image",
            ],
            required: true,
          },
          {
            model: Category,
            attributes: ["id", "name"],
            required: true,
          },
        ],
      });

      const musicArray = [];
      const songsId = [];
      song.map((item, key) => {
        item.Song.id.toString();
        musicArray.push(item.Song);
        songsId.push(item.Song.id);
      });

      const getMultiplecat = await Song.findAll({
        where: { id: songsId },
        attributes: [["id", "song_id"]],
        include: [
          {
            model: Songcategory,
            attributes: ["id"],
            required: true,
            include: [
              {
                model: subcategory,
                attributes: ["name", "id"],
                required: true,
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        success: 1,
        data: {
          id: song[0].subcategory.id,
          category_name: song[0].category.name,
          category_id: song[0].category.id,
          name: song[0].subcategory.name,
          details: song[0].subcategory.details,
          image: song[0].subcategory.image,
          music: musicArray,
          subcategory_list: getMultiplecat,
          is_active: song[0].subcategory.is_active,
        },
      });
    } else {
      const Subcat = await subcategory.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Category,
            attributes: ["name","id"],
            required: true,
          },
        ],
      });
  
      const musicArray = [];
      return res.status(200).json({
        success: 1,
        data: {
          id: Subcat.id,
          category_name: Subcat.category.name,
          category_id: Subcat.category.id,
          title: Subcat.name,
          details: Subcat.details,
          artwork: Subcat.image,
          url: musicArray,
          is_active: Subcat.is_active,
        },
      });
    }
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const getSubcategory = async (req, res) => {
  const errHandler = (err) => {
    return res.status(409).json({
      success: 0,
      msg: err,
    });
  };

  const question = subcategory
    .findAll({})
    .then(function (result) {
      return res.status(200).json({
        success: 1,
        data: result,
      });
    })
    .catch(errHandler);
};

const categoryWiseShow = async (req, res) => {
  const body = req.body;
  try {
    const category_id = body.category_id.split(",");
    const categorywiseShow = await subcategory.findAll({
      where: { category_id: category_id },
    });
    if (categorywiseShow !== null) {
      return res.status(200).json({
        success: 1,
        data: categorywiseShow,
      });
    } else {
      return res.status(200).json({
        success: 1,
        msg: "Data not found!!",
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
  getSubcategory: getSubcategory,
  categoryWiseShow: categoryWiseShow,
  subcatGetbyId: subcatGetbyId,
};
