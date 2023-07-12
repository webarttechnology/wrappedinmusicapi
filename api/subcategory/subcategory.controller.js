const subcategory = require("./subcategory.service");
const Song = require("./../song/song.service");

//const upload = require("./../../uploads/subcategory");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

Song.belongsTo(subcategory, { foreignKey: "subcategory_id" });
subcategory.hasMany(Song, { foreignKey: "subcategory_id" });

const crypto = require("crypto");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");

const createsubcat = async (req, res) => {
  const body = req.body;

  try {
    const duplicateCheck = await subcategory.findOne({
      where: { name: body.name, category_id: body.category_id },
      attributes: [
        "id",
        "name",
        "category_id",
        "details",
        "image",
        "is_active",
      ],
    });

    if (duplicateCheck === null) {
      let filePath = "./../../uploads/subcategory";
      var imagename = Date.now() + ".png";
      const imagepath = filePath + "/" + Date.now() + ".png";
      let buffer = Buffer.from(body.image.split(",")[1], "base64");
      fs.writeFileSync(path.join(__dirname, imagepath), buffer);
      body.image = "uploads/subcategory/" + imagename;

      // body.image = `uploads/images/${req.file.filename}`;
      const subcat = await subcategory.create({
        name: body.name,
        category_id: body.category_id,
        details: body.details,
        image: body.image,
        is_active: 1,
      });
      if (subcat) {
        return res.status(200).json({
          success: 1,
          msg: "Data has been added successfully.",
          data: subcat,
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
        msg: "Subcategory already exists",
      });
    }
  } catch (e) {
    return res.status(200).json({
      success: 0,
      msg: e,
    });
  }
};

const subcatGetbyId = async (req, res) => {
  try {
    const showById = await subcategory.findOne({
      where: { id: req.params.id },
    });

    if (showById !== null) {
      return res.status(200).json({
        success: 1,
        data: {
          id: showById.id,
          category_id: showById.category_id,
          name: showById.name,
          details: showById.details,
          image: showById.image,
          is_active: showById.is_active,
        },
      });
    } else {
      return res.status(200).json({
        success: 0,
        msg: "Data not found!!",
      });
    }
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const getSubcategory = async (req, res) => {
  const errHandler = (err) => {
    return res.status(409).json({
      success: 0,
      msg: err,
    });
  };

  const question = subcategory
    .findAll({})
    .then(function (result) {
      return res.status(200).json({
        success: 1,
        data: result,
      });
    })
    .catch(errHandler);
};

const updateSubcategory = async (req, res) => {
  const body = req.body;
  // return res.status(200).json({
  //   success: 1,
  //   msg: {
  //     name: body.name,
  //     category_id: body.category_id,
  //     id :body.id
  //   },
  // });
  try {
    //  const duplicateCheck = await subcategory.count({
    //    where: {
    //      name: body.name,
    //      category_id: body.category_id,
    //       id: { $not: body.id },
    //    },
    //    attributes: [
    //      "id",
    //      "name",
    //      "category_id",
    //      "details",
    //      "image",
    //      "is_active",
    //    ],
    //  });

    // return res.status(200).json({
    //   success: 1,
    //   msg: duplicateCheck,
    // });
    if (body.image) {
      let filePath = "./../uploads/subcategory";
      var imagename = Date.now() + ".png";
      const imagepath = filePath + "/" + Date.now() + ".png";
      let buffer = Buffer.from(body.image.split(",")[1], "base64");
      fs.writeFileSync(path.join(__dirname, imagepath), buffer);
      body.image = "uploads/subcategory/" + imagename;

      var subcategoryUpdate = await subcategory.update(
        {
          category_id: body.category_id,
          name: body.name,
          details: body.details,
          image: body.image,
        },
        { where: { id: body.id } }
      );
    } else {
      var subcategoryUpdate = await subcategory.update(
        {
          category_id: body.category_id,
          name: body.name,
          details: body.details,
          is_active: body.is_active,
        },
        { where: { id: body.id } }
      );
    }
    if (subcategoryUpdate == 1) {
      return res.status(200).json({
        success: 1,
        msg: "Update successfully",
      });
    } else {
      return res.status(200).json({
        success: 0,
        msg: "Some error. Please try again",
      });
    }
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const deleteSubcategory = async (req, res) => {
  try {
    const rowsDeleted = await subcategory.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (rowsDeleted === 1) {
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
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const categoryWiseShow = async (req, res) => {
  const body = req.body;
  try {
    const categorywiseShow = await subcategory.findAll({
      where: { category_id: req.params.id },
    });
    if (categorywiseShow !== null) {
      return res.status(200).json({
        success: 1,
        data: categorywiseShow,
      });
    } else {
      return res.status(200).json({
        success: 1,
        msg: "Data not found!!",
      });
    }
  } catch (e) {
    return res.status(409).json({
      success: 0,
      msg: e,
    });
  }
};

const searchbyCategoryWise = async (req, res) => {
  const body = req.body;
  // try {
  const categorywiseShow = await subcategory.findAll({
    where: {
      name: { [Op.like]: "%" + body.search_term + "%" },
      category_id: body.category_id,
    },
  });
  // return res.status(200).json({
  //   success: 1,
  //   data: categorywiseShow,
  // });
  if (categorywiseShow === null) {
    return res.status(200).json({
      success: 0,
      msg: "Data not found",
    });
  } else {
    return res.status(200).json({
      success: 1,
      data: categorywiseShow,
    });
  }

  // } catch (e) {
  //   return res.status(409).json({
  //     success: 0,
  //     msg: e,
  //   });
  // }
};

module.exports = {
  createsubcat: createsubcat,
  getSubcategory: getSubcategory,
  categoryWiseShow: categoryWiseShow,
  subcatGetbyId: subcatGetbyId,
  updateSubcategory: updateSubcategory,
  deleteSubcategory: deleteSubcategory,
  searchbyCategoryWise: searchbyCategoryWise,
};
