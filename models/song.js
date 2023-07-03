'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Song.init(
    {
      name: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      subcategory_id: DataTypes.INTEGER,
      description: DataType.TEXT,
      music_file: DataTypes.STRING,
      is_active: DataTypes.ENUM("0", "1"),
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};