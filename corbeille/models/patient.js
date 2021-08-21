"use strict";
const { Model } = require("sequelize");
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
      models.patient.belongsTo(models.famille, {
        foreignKey: {
          allowNull: false,
        },
      });
      models.patient.belongsTo(models.cause_malnutrition, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  patient.init(
    {
      id_patient: DataTypes.STRING,
      nom_patient: DataTypes.STRING,
      postnom_patient: DataTypes.STRING,
      prenom_patient: DataTypes.STRING,
      sexe: DataTypes.STRING,
      age: DataTypes.INTEGER,
      provenance_patient: DataTypes.STRING,
      mode_arrive: DataTypes.STRING,
      poids_naissance: DataTypes.FLOAT,
      fin_allaitement: DataTypes.BOOLEAN,
      mois_fin_allaitement: DataTypes.INTEGER,
      diversification_aliment: DataTypes.INTEGER,
      constitution_aliment: DataTypes.TEXT,
      telephone: DataTypes.STRING,
      id_cause_malnutrition: DataTypes.STRING,
      id_famille: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "patient",
    }
  );
  return patient;
};
