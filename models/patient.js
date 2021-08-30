'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.patient.hasMany(models.anthropometrique);
      models.patient.belongsToMany(models.user, { through: "consulter_par" });
      models.patient.hasMany(models.cause_malnutrition);
      models.patient.belongsTo(models.famille, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  };
  patient.init({
    nom_patient: DataTypes.STRING,
    postnom_patient: DataTypes.STRING,
    prenom_patient: DataTypes.STRING,
    sexe_patient: DataTypes.STRING,
    date_naissance_patient: DataTypes.DATEONLY,
    adresse_patient: DataTypes.TEXT,
    provenance_patient: DataTypes.STRING,
    mode_arrive: DataTypes.STRING,
    poids_naissance: DataTypes.FLOAT,
    image_patient: DataTypes.TEXT,
    telephone: DataTypes.STRING,
    familleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'patient',
  });
  return patient;
};