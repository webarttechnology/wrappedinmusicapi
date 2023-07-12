const Sequelize = require("sequelize");
const sequelize = require("../../config/database");


module.exports = sequelize.define("Scriptcategory", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  script_id: {
    type: Sequelize.INTEGER,
  },
  category_id: {
    type: Sequelize.INTEGER,
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