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
  category_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  subcategory_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  artist_name: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  music_file: {
    type: Sequelize.STRING(255),
    allowNull: false,
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
