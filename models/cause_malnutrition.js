"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cause_malnutrition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.cause_malnutrition.hasMany(models.patient);
    }
  }
  cause_malnutrition.init(
    {
      id_cause_malnutrition: DataTypes.STRING,
      atcd_mas: DataTypes.BOOLEAN,
      nbre_chute: DataTypes.NUMBER,
      mas_fratrie: DataTypes.BOOLEAN,
      terme_grossesse: DataTypes.STRING,
      sejour_neonat: DataTypes.BOOLEAN,
      eig: DataTypes.FLOAT,
      lieu_accouchement: DataTypes.STRING,
      asphyxie_perinatal: DataTypes.BOOLEAN,
      dpm: DataTypes.STRING,
      calendrier_vaccinal: DataTypes.BOOLEAN,
      rang_fratrie: DataTypes.INTEGER,
      taille_fratrie: DataTypes.INTEGER,
      atcd_rougeole_fratrie: DataTypes.BOOLEAN,
      vaccination_rougeole: DataTypes.BOOLEAN,
      terrain_vih: DataTypes.BOOLEAN,
      tbc: DataTypes.BOOLEAN,
      atcd_du_tbc_dans_fratrie: DataTypes.BOOLEAN,
      hospitalisation_recente: DataTypes.BOOLEAN,
      diagnostique_hospitalisation: DataTypes.TEXT,
      cocktail_atb: DataTypes.BOOLEAN,
      duree_prise_atb: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cause_malnutrition",
    }
  );
  return cause_malnutrition;
};
