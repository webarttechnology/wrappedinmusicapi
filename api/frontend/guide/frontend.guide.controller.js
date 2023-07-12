const Script = require("./../../guide/guide.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const crypto = require("crypto");
const Joi = require("joi");


const getAllScript = async (req,res) =>{
     try {
         const song = await Script.findAll({});
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
