const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define("Song", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER(11),
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },

  description: {
    type: Sequelize.TEXT(),
    allowNull: false,
  },
  duration: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  amount: {
    type: Sequelize.DOUBLE(8, 2),
    allowNull: false,
  },
  music_file: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  is_active: {
    type: Sequelize.ENUM("0", "1"),
    allowNull: false,
    default: "1",
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
