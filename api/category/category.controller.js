const category = require('./category.service');

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Joi = require("joi");



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
};