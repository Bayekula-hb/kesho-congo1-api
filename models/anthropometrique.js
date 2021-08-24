'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anthropometrique extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.anthropometrique.belongsTo(models.patient, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  };
  anthropometrique.init({
    peri_cranien: DataTypes.FLOAT,
    peri_brachial: DataTypes.FLOAT,
    poids: DataTypes.FLOAT,
    taille: DataTypes.FLOAT,
    type_malnutrition: DataTypes.STRING,
    date_examen: DataTypes.DATEONLY,
    id_patient: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'anthropometrique',
  });
  return anthropometrique;
};