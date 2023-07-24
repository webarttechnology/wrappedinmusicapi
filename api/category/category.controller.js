const category = require('./category.service');


const Joi = require("joi");

const createCategory = async(req,res)=>{
       try {
        const duplicateCatCheck = await category.findOne({
          where: { name: body.name },
        });

        if(duplicateCatCheck !== null){
           const subcat = await category.create({
             name: body.name,
             slug_name: body.category_id,
             is_active: 1,
           });
        }else{
           return res.status(200).json({
             success: 0,
             msg: "Data already exists",
           });
        }
       } catch (e) {
         return res.status(409).json({
           success: 0,
           msg: e,
         });
       }
}



const getcategory = async(req,res)=>{
      const errHandler = (err) => {
        return res.status(409).json({
          success: 0,
          msg: err,
        });
      };

      const question = category
        .findAll({})
        .then(function (result) {
          return res.status(200).json({
            success: 1,
            data: result,
          });
        })
        .catch(errHandler);
}

module.exports = {
  getcategory: getcategory,
  createCategory: createCategory,
};