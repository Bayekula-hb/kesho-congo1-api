'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cause_malnutritions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      atcd_mas: {
        type: Sequelize.BOOLEAN
      },
      nbre_chute: {
        type: Sequelize.INTEGER
      },
      mas_fratrie: {
        type: Sequelize.BOOLEAN
      },
      terme_grossesse: {
        type: Sequelize.STRING
      },
      sejour_neonat: {
        type: Sequelize.BOOLEAN
      },
      eig: {
        type: Sequelize.FLOAT
      },
      lieu_accouchement: {
        type: Sequelize.STRING
      },
      asphyxie_perinatal: {
        type: Sequelize.BOOLEAN
      },
      dpm: {
        type: Sequelize.STRING
      },
      cause_dpm: {
        type: Sequelize.TEXT
      },
      calendrier_vaccinal: {
        type: Sequelize.BOOLEAN
      },
      vaccin_non_recu: {
        type: Sequelize.TEXT
      },
      rang_fratrie: {
        type: Sequelize.STRING
      },
      taille_fratrie: {
        type: Sequelize.INTEGER
      },
      atcd_rougeole_fratrie: {
        type: Sequelize.BOOLEAN
      },
      vaccination_rougeole: {
        type: Sequelize.BOOLEAN
      },
      terrain_vih: {
        type: Sequelize.BOOLEAN
      },
      allaitement_6mois: {
        type: Sequelize.BOOLEAN
      },
      age_fin_allaitement: {
        type: Sequelize.INTEGER
      },
      tbc: {
        type: Sequelize.BOOLEAN
      },
      atcd_du_tbc_dans_fratrie: {
        type: Sequelize.BOOLEAN
      },
      hospitalisation_recente: {
        type: Sequelize.BOOLEAN
      },
      diagnostic_hospitalisation: {
        type: Sequelize.TEXT
      },
      produit_plante: {
        type: Sequelize.BOOLEAN
      },
      duree_produit_plante: {
        type: Sequelize.INTEGER
      },
      cocktail_atb: {
        type: Sequelize.BOOLEAN
      },
      duree_prise_atb: {
        type: Sequelize.INTEGER
      },
      traitement_nutri: {
        type: Sequelize.STRING
      },
      diversification_aliment: {
        type: Sequelize.INTEGER
      },
      constitution_aliment: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cause_malnutritions');
  }
};