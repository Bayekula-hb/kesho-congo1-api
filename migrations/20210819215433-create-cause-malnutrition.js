'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cause_malnutritions', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      id_cause_malnutrition: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      atcd_mas: {
        type: Sequelize.BOOLEAN
      },
      nbre_chute: {
        type: Sequelize.NUMBER
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
      calendrier_vaccinal: {
        type: Sequelize.BOOLEAN
      },
      rang_fratrie: {
        type: Sequelize.INTEGER
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
      tbc: {
        type: Sequelize.BOOLEAN
      },
      atcd_du_tbc_dans_fratrie: {
        type: Sequelize.BOOLEAN
      },
      hospitalisation_recente: {
        type: Sequelize.BOOLEAN
      },
      diagnostique_hospitalisation: {
        type: Sequelize.TEXT
      },
      cocktail_atb: {
        type: Sequelize.BOOLEAN
      },
      duree_prise_atb: {
        type: Sequelize.INTEGER
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