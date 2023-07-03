const Sequelize = require("sequelize");
const sequelize = require("../../config/database");


module.exports = sequelize.define("Script", {
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

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      script_des: {
        type: Sequelize.TEXT,
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