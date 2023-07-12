const Script = require('./guide.service');
const Guidecategory = require('./guidecategory.service');
const Category = require('./../category/category.service');
const Subcategory = require("./../subcategory/subcategory.service");


Subcategory.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Subcategory, { foreignKey: "category_id" });

Guidecategory.belongsTo(Script, { foreignKey: "script_id" });
Script.hasMany(Guidecategory, { foreignKey: "script_id" });

Guidecategory.belongsTo(Subcategory, { foreignKey: "subcategory_id" });
Subcategory.hasMany(Guidecategory, { foreignKey: "subcategory_id" });

Guidecategory.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Guidecategory, { foreignKey: "category_id" });


const crypto = require("crypto");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");

const createScript = async (req,res) => {
     const body = req.body;
     try {
         const duplicateCheck = await Script.findOne({
           where: {
             name: body.name,
           },
         });

         if (duplicateCheck === null) {

           const subcategory_id = body.subcategory_id;

           const songs = await Script.create({
             name: body.name,
             description: body.description,
             is_active: "1",
           });

             var guideArray = [];

             subcategory_id.map((item, key) => {
               var songsModel = {
                 script_id: songs.id,
                 category_id: body.category_id,
                 subcategory_id: item,
               };
               guideArray.push(songsModel);
             });

            

             var songscat = Guidecategory.bulkCreate(guideArray); 
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
             msg: "Already exists this script",
           });
         }
     } catch (e) {
       return res.status(409).json({
         success: 0,
         msg: e,
       });
     }
};

const getbyIdScript = async (req,res) => {
    try {
         const getallScript = await Script.findOne({
           where: { id: req.params.id },
         });

         if (getallScript !== null) {
           return res.status(200).json({
             success: 1,
             data: getallScript,
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


const getAllScript = async (req,res) =>{
    try {
         const getallScript = await Script.findAll({
           attributes: ["id", "name", "description", "is_active"],
           include: [
             {
               model: Guidecategory,
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
         
         if (getallScript !== null) {
           return res.status(200).json({
             success: 1,
             data: getallScript,
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

const categoryWiseScript = async (req,res) => {
    try {
         const getallScript = await Script.findAndCountAll({
           where: { category_id: req.params.id },
         });
        
         if (getallScript.count !== 0) {
           return res.status(200).json({
             success: 1,
             data: getallScript,
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

const updateScript = async (req, res) => {
  try {
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const deleteScript = async (req, res) => {
  try {
      const rowsDeleted = await Guidecategory.destroy({
        where: {
          script_id: req.params.id,
        },
      });

       const scriptDel = await Script.destroy({
         where: {
           id: req.params.id,
         },
       });

      if (scriptDel === 1) {
        return res.status(200).json({
          success: 1,
          msg: "Data has been deleted",
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
  createScript: createScript,
  getbyIdScript: getbyIdScript,
  getAllScript: getAllScript,
  categoryWiseScript: categoryWiseScript,
  updateScript: updateScript,
  deleteScript: deleteScript,
};