const Order = require("./../order/order.service");
const Song = require("./../../song/song.service");

Order.belongsTo(Song, { foreignKey: "song_id" });
Song.hasMany(Order, { foreignKey: "song_id" });
const paypal = require("paypal-rest-sdk");

const configData = require("./../../../config/paypal.json");

paypal.configure({
  mode: configData.PAYPAL_MODE,
  client_id: configData.PAYPAL_CLIENT_KEY,
  client_secret: configData.PAYPAL_SECRET_KEY,
});

const fs = require("fs");
const path = require("path");


const renderBuypage = async(req,res) =>{
    const body = req.body;
    try {

         let filePath = "./../../../uploads/songs";
         var songname = "rec" + Date.now() + ".mp3";
         const songpath = filePath + "/" + "rec" + Date.now() + ".mp3";
         let sbuffer = Buffer.from(body.music_file.split(",")[1], "base64");
         fs.writeFileSync(path.join(__dirname, songpath), sbuffer);
         body.music_file = "uploads/songs/" + songname;
        
        const orstr = "OR";
        const rnum = Math.random().toString().substr(2, 6);
        const orderId = orstr + "" + rnum;
        const orderCreate = await Order.create({
          order_no: orderId,
          song_id: body.song_id,
          registration_id: body.registration_id,
          amount: body.amount,
          is_ownscript: body.is_ownscript,
          script_id: body.script_id === "" ? 0 : body.script_id,
          add_position: body.add_position,
          duration: body.duration,
          music_file: body.music_file,
          status: "0",
          fulfillment_status: "0",
        });
        if (orderCreate) {
             const orderdetails = await Order.findOne({
               where: { order_no: orderId },
               include: [
                 {
                   model: Song,
                   attributes: ["name", "description"],
                   required: true,
                 },
               ],
             });
              if(orderdetails !== null){
                     const create_payment_json = {
                       intent: "sale",
                       payer: {
                         payment_method: "paypal",
                       },
                       redirect_urls: {
                         return_url: "http://localhost:3000/success",
                         cancel_url: "http://localhost:3000/cancel",
                       },
                       transactions: [
                         {
                           item_list: {
                             items: [
                               {
                                 name: orderdetails.Song.name,
                                 sku: "001",
                                 price: orderdetails.amount.toFixed(2),
                                 currency: "USD",
                                 quantity: 1,
                               },
                             ],
                           },
                           amount: {
                             currency: "USD",
                             total: orderdetails.amount.toFixed(2),
                           },
                           description: orderdetails.Song.description,
                         },
                       ],
                     };
                     paypal.payment.create(
                       create_payment_json,
                       function (error, payment) {
                         if (error) {
                           return res.status(200).json({
                             success: 0,
                             msg: error,
                           });
                         } else {
                           for (let i = 0; i < payment.links.length; i++) {
                             if (payment.links[i].rel === "approval_url") {
                               return res.status(200).json({
                                 success: 1,
                                 data: {
                                   url: payment.links[i].href,
                                   order_no: orderId,
                                 },
                               });
                               // console.log(payment.links[i].href);
                               // res.redirect(payment.links[i].href);
                             }
                           }
                         }
                       }
                     );
              }else{
                 return res.status(200).json({
                   success: 0,
                   msg: "Some error. please try again",
                 });
              }
               
        } else {
          return res.status(200).json({
            success: 0,
            msg: "Some error. please try again",
          });
        }
         
    } catch (e) {
      return res.status(409).json({
        success: 0,
        msg: e,
      });
    }
}

const sucesspage = async(req,res) =>{
   const body = req.body;
  try {
       if(body.status === true){
          var paymentStatusUpdate = await Order.update(
            {
              status: "1",
            },
            { where: { order_no: body.order_no } }
          );
        if(paymentStatusUpdate == 1){
             return res.status(200).json({
               success: 1,
               msg: "Data has been updated",
             });
        }else{
             return res.status(200).json({
               success: 0,
               msg: "Some error.Please try again",
             });
        }

       }else{

       }
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const cancelpage = async(req,res) =>{
   const body = req.body;
   try {
   } catch (e) {
     return res.status(409).json({
       success: 0,
       msg: e,
     });
   }
}




module.exports = {
  renderBuypage: renderBuypage,
  sucesspage: sucesspage,
  cancelpage: cancelpage,
};