const Guide = require("./../../guide/guide.service");
const Guidecategory  = require("./../../guide/guidecategory.service");



const getAllScript = async (req,res) =>{
     try {
         const song = await Guidecategory.findAll({
           where: { category_id: req.params.id },
           include: [
             {
               model: Guide,
               attributes: [
                 "name",
                 "description",
               ],
               required: true,
             },
           ],
         });
         if(song !== null){
             return res.status(200).json({
               success: 1,
               data: song,
             });
         }else{
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
  getAllScript: getAllScript,
};
