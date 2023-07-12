'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scriptcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Scriptcategory.init({
    song_id: DataTypes.INTEGER,
    registration_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Scriptcategory',
  });
  return Scriptcategory;
};