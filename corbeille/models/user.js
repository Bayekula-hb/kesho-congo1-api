"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id_user: DataTypes.STRING,
      nom_user: DataTypes.STRING,
      postnom_user: DataTypes.STRING,
      prenom_user: DataTypes.STRING,
      email: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};