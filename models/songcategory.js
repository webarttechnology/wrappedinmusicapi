'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Songcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Songcategory.init({
    song_id: DataTypes.INTEGER,
    subcategory_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Songcategory',
  });
  return Songcategory;
};