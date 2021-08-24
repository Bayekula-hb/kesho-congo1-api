"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cause_malnutritions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      atcd_mas: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      nbre_chute: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      mas_fratrie: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      terme_grossesse: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sejour_neonat: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      eig: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      lieu_accouchement: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      asphyxie_perinatal: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      dpm: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cause_dpm: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      calendrier_vaccinal: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      vaccin_non_recu: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      rang_fratrie: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      taille_fratrie: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      atcd_rougeole_fratrie: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      vaccination_rougeole: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      terrain_vih: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      allaitement_6mois: {
        type: Sequelize.BOOLEAN,
      },
      age_fin_allaitement: {
        type: Sequelize.INTEGER,
      },
      tbc: {
        type: Sequelize.BOOLEAN,
      },
      atcd_du_tbc_dans_fratrie: {
        type: Sequelize.BOOLEAN,
      },
      hospitalisation_recente: {
        type: Sequelize.BOOLEAN,
      },
      diagnostic_hospitalisation: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      produit_plante: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      duree_produit_plante: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      cocktail_atb: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      duree_prise_atb: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      traitement_nutri: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      diversification_aliment: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      constitution_aliment: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cause_malnutritions");
  },
};
