const Order = require("./../../frontend/order/order.service");
const Song = require("./../../song/song.service");
const User = require("./../../users/user.service");

Order.belongsTo(Song, { foreignKey: "song_id" });
Song.hasMany(Order, { foreignKey: "song_id" });

Order.belongsTo(User, { foreignKey: "registration_id" });
User.hasMany(Order, { foreignKey: "registration_id" });


const getAllOrder = async (req, res) =>{
     try {
          if(req.params.id === "2"){
                 var orderList = await Order.findAll({
                   where: { status: "1" },
                   attributes: [
                     "id",
                     "order_no",
                     "amount",
                     "status",
                     "fulfillment_status",
                   ],
                   include: [
                     {
                       model: Song,
                       attributes: ["name"],
                       required: true,
                     },
                     {
                       model: User,
                       attributes: ["name"],
                       required: true,
                     },
                   ],
                 });
          }else{
                var orderList = await Order.findAll({
                  where: {
                    status: "1",
                    fulfillment_status: req.params.id,
                  },
                  attributes: [
                    "id",
                    "order_no",
                    "amount",
                    "status",
                    "fulfillment_status",
                  ],
                  include: [
                    {
                      model: Song,
                      attributes: ["name"],
                      required: true,
                    },
                    {
                      model: User,
                      attributes: ["name"],
                      required: true,
                    },
                  ],
                });
          }
          
          if(orderList !== null){
                 return res.status(200).json({
                   success: 1,
                   data: orderList,
                 });
          }else{
                return res.status(200).json({
                   success: 0,
                   msg: "Data do not found"
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
  getAllOrder: getAllOrder,
};
