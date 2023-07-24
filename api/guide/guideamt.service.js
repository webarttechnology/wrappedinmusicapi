const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define("Scriptamt", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  amount: {
    type: Sequelize.DOUBLE(8, 2),
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
