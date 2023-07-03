const Script = require('./script.service');

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");

const createScript = async (req,res) => {
     const body = req.body;
     try {
         const duplicateCheck = await Script.findOne({
           where: {
             name: body.name,
             category_id: body.category_id,
             subcategory_id: body.subcategory_id,
           },
         });

         if (duplicateCheck === null) {

           const songs = await Script.create({
             name: body.name,
             category_id: body.category_id,
             subcategory_id: body.subcategory_id,
             description: body.description,
             script_des: body.script_des,
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
           order: [["name", "ASC"]],
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
      const rowsDeleted = await Script.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (rowsDeleted === 1) {
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