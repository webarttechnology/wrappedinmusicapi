const user = require("./user.service");
require("dotenv").config();
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Joi = require("joi");
const configData = require("./../../config/email.json");
const handlebars = require("handlebars");
const fs = require("fs");



 const  createUser = async (req, res) => {
    const body = req.body;
      try {
        //validation start
        const schema = Joi.object({
          name: Joi.required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(8).required(),
        });
        const data = {
          name: body.name,
          email: body.email,
          password: body.password,
        };
        const validation = schema.validate(data);
        if (validation.error) {
          return res.status(500).json({
            success: 0,
            msg: validation.error.details,
          });
        }

        //validation end
        //duplicate Check

        const getemailId = await user.findOne({
          where: { email: body.email, is_verified:'1' },
        });
       
        if (getemailId == null) {
          const n = Math.random().toString().substr(2, 6);
          const salt = genSaltSync(10);
          body.password = hashSync(body.password, salt);
          const token = crypto.randomBytes(20).toString("hex");
          body.token_code = token;
          body.verification_code = n;
          (body.is_verified = "0"), (body.is_active = "1");
          //insert user

          const subcat = await user.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            is_verified: body.is_verified,
            is_active: body.is_active,
            token_code: body.token_code,
            verification_code: body.verification_code,
          });

          
          if (subcat) {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: configData.SMTP_USER,
                pass: configData.SMTP_PASSWORD,
              },
            });

            // Read the email template file
            const templateFile = fs.readFileSync(
              "template/email-otp-template.hbs",
              "utf8"
            );
            // Compile the template
            const template = handlebars.compile(templateFile);
            const data = {
              organizationName: "Wrappedin Music",
              otp: n,
              otptype: "Registration",
            };
            // Render the template with the data
            const html = template(data);

            const mailOptions = {
              from: "wrappedinmusic<" + configData.SMTP_USER + ">",
              to: body.email,
              subject: "Send Registration Verification code",
              html: html,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return res.status(200).json({
                  success: 0,
                  data: {
                    msg: "OTP not send,some error!",
                  },
                  token_code: token,
                });
              } else {
                return res.status(200).json({
                  success: 1,
                  data: {
                    msg: "OTP sent to registered email id",
                  },
                  token_code: token,
                });
              }
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
            msg: "Email Id alredy registered",
          });
        }
      } catch (e) {
        return res.status(409).json({
          success: 0,
          msg: "some error",
        });
      }
    
  };

 const  otpVerification = async (req, res) => {
    const body = req.body;
    try {
      const schema = Joi.object({
        //   email: Joi.string().email().required(),
        otp: Joi.string().length(6).required(),
      });
      const data = {
        otp: body.otp,
      };
      const validation = schema.validate(data);
      if (validation.error) {
        return res.status(500).json({
          success: 0,
          msg: validation.error.details,
        });
      }
     
        const otpVerification = await user.findOne({
          where: { email: body.email, verification_code: body.otp },
        });

       
        if (otpVerification !== null) {
             const statusUpdate = await user.update(
               { is_verified: "1" },
               {
                 where: {
                   id: otpVerification.id,
                 },
               }
             );
             if(statusUpdate){
                  return res.status(200).json({
                    success: 1,
                    msg: "OTP verified",
                  });
             }else{
               return res.status(200).json({
                 success: 0,
                 msg: "OTP verification error. Please try again",
               });
             }
        } else {
           return res.status(400).json({
             success: 0,
             msg: "Otp does not match",
           });
        }
      
    } catch (e) {
      return res.status(409).json({
        success: 0,
        msg: "some error",
      });
    }
    
  };

  const resendOtp = async (req,res) =>{
    const body = req.body;
    try {
       body.verification_code = Math.random().toString().substr(2, 6);

       // Read the email template file
       const templateFile = fs.readFileSync(
         "template/email-otp-template.hbs",
         "utf8"
       );

       // Compile the template
       const template = handlebars.compile(templateFile);

       const data = {
         organizationName: "Wrappedin Music",
         otp: body.verification_code,
         otptype: "Resend",
       };

       // Render the template with the data
       const html = template(data);

       to = body.email;
       subject = "Resend OTP";
       //email setup
       var transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
           user: configData.SMTP_USER,
           pass: configData.SMTP_PASSWORD,
         },
       });
       //email body
       var mailOptions = {
         from: "wrappedinmusic<" + configData.SMTP_USER + ">",
         to: body.email,
         subject: subject,
         html: html,
       };
       //Database verification code update
          const getemailId = await user.findOne({
                  where: { email: body.email },
            });
            const verificationCodeUpdate = await user.update(
              { verification_code: body.verification_code }, {where: {id: getemailId.id,},});
          if (verificationCodeUpdate){
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  return res.status(200).json({
                    success: 0,
                    msg: "Some error while send mail!",
                  });
                }
                return res.status(200).json({
                  success: 1,
                  msg: "OTP sent to registered email id!",
                });
              });
          }else{
              return res.status(200).json({
                success: 0,
                msg: "Otp update error. Please try again",
              });
          }
            
        
    } catch (e) {
      return res.status(409).json({
        success: 0,
        msg: "some error",
      });
    }
   
  };

  

  const login = async (req, res) => {
    const body = req.body;
    try {
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

        const getemailId = await user.findOne({
          where: { email: body.email, is_verified: "1" },
        });
        if (getemailId === null) {
          return res.status(200).json({
            success: 0,
            msg: "Invalid email",
          });
        }else{
            const passwordCheck = compareSync(body.password, getemailId.password);
            if (passwordCheck) {
              const jsontoken = sign({ result: getemailId }, "fqwe1234", {
                expiresIn: "12h",
              });
              return res.json({
                success: 1,
                msg: "login successfully",
                is_login: true,
                data: {
                  id: getemailId.id,
                  name: getemailId.name,
                  email: getemailId.email,
                  phone: getemailId.phone,
                  is_verified: getemailId.is_verified,
                  is_active: getemailId.is_active,
                },
                token_code: jsontoken,
              });
            } else {
              return res.json({
                success: 0,
                msg: "Invalid password. Please try again",
              });
            }
        }
    } catch (e) {
      return res.status(409).json({
        success: 0,
        msg: "some error",
      });
    }
    
  };

  const forgotpassword = async (req, res) => {
    const body = req.body;
    try {
      //server side validation
      const schema = Joi.object({
        email: Joi.string().email().required(),
      });
      const validation = schema.validate(body);
      if (validation.error) {
        return res.status(500).json({
          success: 0,
          msg: validation.error.details,
        });
      }
      //get email id from database
          const results = await user.findOne({
            where: { email: body.email, is_verified: "1" },
          });
        
        if (results !== null) {
          body.verification_code = Math.random().toString().substr(2, 6);

          // Read the email template file
          const templateFile = fs.readFileSync(
            "template/email-otp-template.hbs",
            "utf8"
          );

          // Compile the template
          const template = handlebars.compile(templateFile);

          const data = {
            organizationName: "Wrappedin Music",
            otp: body.verification_code,
            otptype: "Reset password",
          };

          // Render the template with the data
          const html = template(data);

          to = body.email;
          subject = "Reset password";
          //email setup
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: configData.SMTP_USER,
              pass: configData.SMTP_PASSWORD,
            },
          });
          //email body
          var mailOptions = {
            from: "wrappedinmusic<" + configData.SMTP_USER + ">",
            to: body.email,
            subject: subject,
            html: html,
          };
          //Database verification code update
             const verificationCodeUpdate = await user.update(
               { verification_code: body.verification_code },
               { where: { id: results.id } }
             );
          if (verificationCodeUpdate){
             transporter.sendMail(mailOptions, function (error, info) {
               if (error) {
                 return res.status(200).json({
                   success: 0,
                   msg: "Some error while send mail!",
                 });
               }
               return res.status(200).json({
                 success: 1,
                 msg: "OTP sent to registered email id!",
               });
             });
          }
        } else {
          return res.status(200).json({
            success: 0,
            msg: "Invalid email",
          });
        }
      
    } catch (e) {
      return res.status(409).json({
        success: 0,
        msg: "some error",
      });
    }
   
  };

  const resetpassword = async (req,res) =>{
       const body = req.body;
       try {
         const schema = Joi.object({
           password: Joi.string().min(8).required(),
         });
         const data = {
           password: body.password,
         };
         const validation = schema.validate(data);
         if (validation.error) {
           return res.status(500).json({
             success: 0,
             msg: validation.error.details,
           });
         }
         const salt = genSaltSync(10);
         body.password = hashSync(body.password, salt);
          const getemailId = await user.findOne({
            where: { email: body.email, is_verified: "1" },
          });

          if (getemailId){
                    const passwordreset = await user.update(
                      { password: body.password },
                      { where: { id: getemailId.id } }
                    );
                if (passwordreset) {
                    return res.status(200).json({
                      success: 1,
                      msg: "Password changed successfully",
                    });
                } else {
                   return res.status(500).json({
                     success: 0,
                     msg: "Error!! Please try again",
                   });
                }
          }
            
         
       } catch (e) {
         return res.status(409).json({
           success: 0,
           msg: "some error",
         });
       }
      
  };

  const profileEdit = async (req,res) =>{
     const body = req.body;
    try {
       const userUpdate = await user.update(
         {
           name: body.name,
           phone:body.phone,
           city: body.city,
           state: body.state,
           country: "USA",
           zipcode: body.zipcode,
           address: body.address,
           address1: body.address1,
         },
         { where: { id: body.id } }
       );
       if(userUpdate){
        return res.status(200).json({
          success: 1,
          msg: "Data has been updated",
        });
       }else{
        return res.status(200).json({
          success: 0,
          msg: "Some error,please try again",
        });
       }

    } catch (e) {
      return res.status(409).json({
        success: 0,
        msg: "some error",
      });
    }
  }

  const passwordChange = async(req,res) =>{
     const body = req.body;
    try {
        
         const salt = genSaltSync(10);
         body.password = hashSync(body.password, salt);
        
           const passwordreset = await user.update(
             { password: body.password },
             { where: { id: body.id } }
           );
           if (passwordreset) {
             return res.status(200).json({
               success: 1,
               msg: "Password changed successfully",
             });
           } else {
             return res.status(500).json({
               success: 0,
               msg: "Error!! Please try again",
             });
           }
        
    } catch (e) {
      return res.status(409).json({
        success: 0,
        msg: "some error",
      });
    }
  }

  const getUserbyId = async(req,res) =>{
        try {
             const showById = await user.findOne({
               where: { id: req.params.id },
             });

             if(showById !== null){
                  //  return res.status(200).json({
                  //    success: 1,
                  //    data: showById,
                  //  });
                    return res.status(200).json({
                      success: 1,
                      data: {
                        name: showById.name,
                        email: showById.email,
                        phone: showById.phone,
                        address: showById.address,
                        address2:showById.address1,
                        city: showById.city,
                        state: showById.state,
                        country: showById.country,
                      },
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
            msg: "some error",
          });
        }
  }



module.exports = {
  createUser: createUser,
  otpVerification: otpVerification,
  resendOtp: resendOtp,
  login: login,
  forgotpassword: forgotpassword,
  resetpassword: resetpassword,
  profileEdit: profileEdit,
  passwordChange: passwordChange,
  getUserbyId: getUserbyId,
};
