'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class consulter_par extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  consulter_par.init({
    id_user: DataTypes.INTEGER,
    id_patient: DataTypes.INTEGER,
    date_consultation: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'consulter_par',
  });
  return consulter_par;
};