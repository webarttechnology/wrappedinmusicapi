const Sequelize = require("sequelize");
const sequelize = require("../../config/database");


module.exports = sequelize.define("Songcategory", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  song_id: {
    type: Sequelize.INTEGER,
  },
  category_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  subcategory_id: {
    type: Sequelize.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});
