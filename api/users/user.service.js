const Sequelize = require("sequelize");
const sequelize = require("../../config/database");


module.exports = sequelize.define("registrations", {
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
  email: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  zipcode: {
    type: Sequelize.INTEGER(6),
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  state: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  country: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  is_verified: {
    type: Sequelize.ENUM("0", "1"),
    allowNull: false,
  },
  is_active: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    default: "1",
  },
  token_code: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  verification_code: {
    type: Sequelize.INTEGER(6),
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