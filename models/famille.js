"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class famille extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.famille.hasMany(models.patient);
    }
  }
  famille.init(
    {
      taille_famille: DataTypes.INTEGER,
      vivre_deux_parent: DataTypes.BOOLEAN,
      mere_enceinte: DataTypes.STRING,
      mere_en_vie: DataTypes.BOOLEAN,
      pere_en_vie: DataTypes.BOOLEAN,
      profession_mere: DataTypes.STRING,
      profession_chef_menage: DataTypes.STRING,
      age_mere: DataTypes.INTEGER,
      scolarite_mere: DataTypes.STRING,
      contraception_mere: DataTypes.BOOLEAN,
      contraception_moyens: DataTypes.STRING,
      niveau_socioeconomique: DataTypes.STRING,
      statut_marital: DataTypes.STRING,
      nbr_femme_pere: DataTypes.INTEGER,
      tribu: DataTypes.STRING,
      religion: DataTypes.STRING,
      posseder_radio_tele: DataTypes.BOOLEAN,
      nbr_repas: DataTypes.INTEGER,
      consommation_poisson: DataTypes.BOOLEAN,
      atb: DataTypes.BOOLEAN,
      liste_atb: DataTypes.TEXT,
      tbc_chez_parents: DataTypes.BOOLEAN,
      tbc_chez: DataTypes.STRING,
      tbc_gueris: DataTypes.BOOLEAN,
      duree_traitement_tbc: DataTypes.STRING,
      tbc_declarer_finie: DataTypes.BOOLEAN,
      nom_tuteur: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "famille",
    }
  );
  return famille;
};
