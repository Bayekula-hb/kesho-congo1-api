'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('familles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taille_menage: {
        type: Sequelize.INTEGER
      },
      vivre_deux_parents: {
        type: Sequelize.BOOLEAN
      },
      nom_tuteur: {
        type: Sequelize.STRING
      },
      date_naissance_tuteur: {
        type: Sequelize.DATEONLY
      },
      mere_enceinte: {
        type: Sequelize.STRING
      },
      pere_en_vie: {
        type: Sequelize.BOOLEAN
      },
      mere_en_vie: {
        type: Sequelize.BOOLEAN
      },
      age_mere: {
        type: Sequelize.INTEGER
      },
      profession_mere: {
        type: Sequelize.STRING
      },
      profession_chef_menage: {
        type: Sequelize.STRING
      },
      scolarite_mere: {
        type: Sequelize.STRING
      },
      contraception_mere: {
        type: Sequelize.BOOLEAN
      },
      type_contraception: {
        type: Sequelize.STRING
      },
      contraception_naturelle: {
        type: Sequelize.STRING
      },
      contraception_moderne: {
        type: Sequelize.STRING
      },
      niveau_socioeconomique: {
        type: Sequelize.STRING
      },
      status_marital: {
        type: Sequelize.STRING
      },
      type_status_marital: {
        type: Sequelize.STRING
      },
      nbre_femme_pere: {
        type: Sequelize.INTEGER
      },
      tribu: {
        type: Sequelize.STRING
      },
      religion: {
        type: Sequelize.STRING
      },
      posseder_radio_tele: {
        type: Sequelize.BOOLEAN
      },
      nbre_repas: {
        type: Sequelize.INTEGER
      },
      consommation_poisson: {
        type: Sequelize.BOOLEAN
      },
      atb: {
        type: Sequelize.BOOLEAN
      },
      liste_atb: {
        type: Sequelize.TEXT
      },
      tbc_parents: {
        type: Sequelize.BOOLEAN
      },
      tbc_chez: {
        type: Sequelize.STRING
      },
      tbc_gueris: {
        type: Sequelize.BOOLEAN
      },
      duree_traitement_tbc: {
        type: Sequelize.STRING
      },
      tbc_declarer_finie: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('familles');
  }
};