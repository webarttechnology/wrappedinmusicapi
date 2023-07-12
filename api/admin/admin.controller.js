const admin =require('./admin.service');
const user =require('./../users/user.service');

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Joi = require("joi");

const login = async (req, res) => {
  try {
    const body = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    const validation = schema.validate(body);
    if (validation.error) {
      return res.status(500).json({
        success: 0,
        msg: validation.error.details,
      });
    }

    const getemailId = await admin.findOne({where: { email: body.email }});
       
      if (getemailId !== null) {
         const result = compareSync(body.password, getemailId.password);
         if (result) {
           const salt = genSaltSync(10);
           // const jsontoken = hashSync(body.password, salt);
           const jsontoken = sign({ result: getemailId }, "qwe1234", {
             expiresIn: "4h",
           });
           return res.json({
             success: 1,
             msg: "login successfully",
             is_login: true,
             data: { id: getemailId.id, email: getemailId.email },
             token_code: jsontoken,
           });
         } else {
           return res.json({
             success: 0,
             msg: "Invalid password",
           });
         }
      }else{
         return res.status(500).json({
           success: 0,
           msg: "Invalid email",
         });
      }
     
  } catch (e) {
    return res.status(400).json({
      success: 0,
      msg: "Some error",
    });
  }
};

const userStatusChange = async (req, res) => {
   const body = req.body;
  try {
      const result = await user.update(
        { is_active: body.is_active },
        {
          where: {
            id: body.id, // Specify the ID of the user you want to update
          },
        }
      );
     if (result){
         return res.json({
           success: 1,
           msg: "Data has been update successfully",
         });
     }else{
           return res.json({
             success: 1,
             msg: "Update error. please try again",
           });
     }
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: "Some Error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      where: { is_verified:'1' },
    });
      if (users !== null){
           return res.status(200).json({
             success: 1,
             data: users,
           });
      }else{
          return res.status(200).json({
            success: 0,
            msg: "Data not found",
          });
      }
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: "Some error",
    });
  }
};

const usrdelete = async (req, res) => {
  try {
    const body = req.body;
     const rowsDeleted = await user.destroy({
       where: {
         id: req.params.id,
       },
     });
      if (rowsDeleted) {
        return res.status(200).json({
          success: 1,
          msg: "User deleted successfully",
        });
      } else {
        return res.status(200).json({
          success: 0,
          msg: "Record Not Found",
        });
      }
  } catch (e) {
    return res.status(400).json({
      success: 0,
      msg: e,
    });
  }
};

module.exports = {
  login: login,
  getUsers: getUsers,
  usrdelete: usrdelete,
  userStatusChange: userStatusChange,
};
