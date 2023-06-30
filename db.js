const Sequelize = require("sequelize");

const sequelize = new Sequelize("music", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorAliases: false,
  logging: true,
});

module.exports = sequelize;
global.sequelize = sequelize;
