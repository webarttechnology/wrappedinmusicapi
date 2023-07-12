const Order = require("./order.service");
const Song = require("./../../song/song.service");
const User = require("./../../users/user.service");

Order.belongsTo(Song, { foreignKey: "song_id" });
Song.hasMany(Order, { foreignKey: "song_id" });

Order.belongsTo(User, { foreignKey: "registration_id" });
User.hasMany(Order, { foreignKey: "registration_id" });

const crypto = require("crypto");
const Joi = require("joi");

const createOrder = async (req, res) => {
  const body = req.body;
  try {
    const orderCreate = await Order.create({
      song_id: body.song_id,
      registration_id: body.registration_id,
    });

    if (orderCreate) {
      return res.status(200).json({
        success: 1,
        msg: "Data has been added successfully.",
        data: orderCreate,
      });
    } else {
      return res.status(200).json({
        success: 0,
        msg: "Add error. Please try again",
      });
    }
  } catch (e) {
    return res.status(200).json({
      success: 0,
      msg: e,
    });
  }
};

const getOderByuser = async (req, res) => {
  try {
    const song = await Order.findAll({
      where: { registration_id: req.params.id },
      attributes: ["id"],
      include: [
        {
          model: Song,
          attributes: ["name", "music_file", "description", "is_active"],
          required: true,
        },
      ],
    });

    const musicArray = [];
    song.map((item, key) => {
      musicArray.push(item.Song);
    });

    if (song !== null) {
      return res.status(200).json({
        success: 1,
        data: musicArray,
      });
    }
  } catch (e) {
    return res.status(200).json({
      success: 0,
      msg: e,
    });
  }
};

module.exports = {
  createOrder: createOrder,
  getOderByuser: getOderByuser,
};
