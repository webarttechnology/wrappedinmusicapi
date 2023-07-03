'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Script extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Script.init({
    name: DataTypes.STRING,
    category_id: DataTypes.STRING,
    subcategory_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Script',
  });
  return Script;
};