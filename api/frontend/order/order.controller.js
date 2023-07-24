const Order = require("./order.service");
const Song = require("./../../song/song.service");
const User = require("./../../users/user.service");


Order.belongsTo(Song, { foreignKey: "song_id" });
Song.hasMany(Order, { foreignKey: "song_id" });

Order.belongsTo(User, { foreignKey: "registration_id" });
User.hasMany(Order, { foreignKey: "registration_id" });

const fs = require("fs");
const path = require("path");
   

// const orderCreate = async (req, res) => {
//   const body = req.body;
//   try {

//     let filePath = "./../../../uploads/songs";
//     var songname = "rec"+ Date.now() + ".mp3";
//     const songpath = filePath + "/" + "rec" + Date.now() + ".mp3";
//     let sbuffer = Buffer.from(body.music_file.split(",")[1], "base64");
//     fs.writeFileSync(path.join(__dirname, songpath), sbuffer);
//     body.music_file = "uploads/songs/" + songname;
    
    
//     const orstr = "OR";
//     const rnum = Math.random().toString().substr(2, 6);
//     const orderId = orstr + "" + rnum;
//     const orderCreate = await Order.create({
//       order_no: orderId,
//       song_id: body.song_id,
//       registration_id: body.registration_id,
//       amount: body.amount,
//       is_ownscript: body.is_ownscript,
//       script_id: body.script_id === "" ? 0 : body.script_id,
//       add_position: body.add_position,
//       duration: body.duration,
//       music_file: body.music_file,
//       status: "0",
//       fulfillment_status:"0",
//     });
//     if (orderCreate) {
//       return res.status(200).json({
//         success: 1,
//         msg: "Data has been added successfully.",
//         data: orderCreate,
//       });
//     }else{
//       return res.status(200).json({
//         success: 0,
//         msg: "Add error. Please try again",
//       });
//     }
//   } catch (e) {
//     return res.status(409).json({
//       success: 0,
//       msg: e,
//     });
//   }
// };

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
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};


module.exports = {
  getOderByuser: getOderByuser,
 
};
