'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RepoBookmarkClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RepoBookmarkClass.init({
    repository: DataTypes.STRING,
    url: DataTypes.STRING,
    full_name: DataTypes.STRING,
    description: DataTypes.STRING,
    language: DataTypes.STRING,
    owner: DataTypes.STRING,
    star: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RepoBookmarkClass',
  });
  return RepoBookmarkClass;
};
