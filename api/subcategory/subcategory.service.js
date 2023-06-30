const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define("subcategory", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER(11),
  },
  category_id: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  details: {
    type: Sequelize.TEXT(),
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  is_active: {
    type: Sequelize.INTEGER(1),
    default: "1",
    allowNull: false,
  },
});
