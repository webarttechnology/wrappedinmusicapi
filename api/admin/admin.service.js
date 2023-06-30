const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define("admin", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  email: {
    type: Sequelize.STRING(200),
  },
  password: {
    type: Sequelize.STRING,
  },
  is_active: {
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
