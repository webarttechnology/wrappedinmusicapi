const Sequelize = require("sequelize");
const sequelize = require("../../../config/database");


module.exports = sequelize.define("Order", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  order_no: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  amount: {
    type: Sequelize.DOUBLE(8, 2),
    allowNull: false,
  },
  is_ownscript: {
    type: Sequelize.ENUM("1", "2"),
    allowNull: true,
  },
  script_id: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
  },
  music_file: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  add_position: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  duration: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM("1", "0"),
    allowNull: true,
  },
  song_id: {
    type: Sequelize.INTEGER,
  },
  registration_id: {
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
