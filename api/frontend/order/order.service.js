const Sequelize = require("sequelize");
const sequelize = require("../../../config/database");


module.exports = sequelize.define("Order", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
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
