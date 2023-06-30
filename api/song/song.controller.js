const song = require("./song.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");

const createSongs = async (req, res) => {
  const body = req.body;
  try {
    let filePath = "../../uploads/songs";
    var imagename = Date.now() + ".png";
    const imagepath = filePath + "/" + Date.now() + ".png";
    let buffer = Buffer.from(body.music_file.split(",")[1], "base64");
    fs.writeFileSync(path.join(__dirname, imagepath), buffer);
    body.music_file = "uploads/subcategory/" + imagename;

    const songs = await song.create({
      name: body.name,
      category_id: body.category_id,
      subcategory_id: body.subcategory_id,
      artist_name: body.artist_name,
      music_file: body.music_file,
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
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const updatesongs = async (req, res) => {
  const body = req.body;
  try {
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const getsongs = async (req, res) => {
  try {
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const getSongsbyCategory = async (req, res) => {
  try {
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const deleteSongs = async (req, res) => {
  try {
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

module.exports = {
  createSongs: createSongs,
  updatesongs: updatesongs,
  getsongs: getsongs,
  getSongsbyCategory: getSongsbyCategory,
  deleteSongs: deleteSongs,
};
