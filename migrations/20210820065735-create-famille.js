'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('familles', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      id_famille: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      taille_famille: {
        type: Sequelize.INTEGER
      },
      vivre_deux_parent: {
        type: Sequelize.BOOLEAN
      },
      mere_enceinte: {
        type: Sequelize.STRING
      },
      mere_en_vie: {
        type: Sequelize.BOOLEAN
      },
      pere_en_vie: {
        type: Sequelize.BOOLEAN
      },
      profession_mere: {
        type: Sequelize.STRING
      },
      profession_chef_menage: {
        type: Sequelize.STRING
      },
      age_mere: {
        type: Sequelize.INTEGER
      },
      scolarite_mere: {
        type: Sequelize.STRING
      },
      contraception_mere: {
        type: Sequelize.BOOLEAN
      },
      contraception_moyens: {
        type: Sequelize.STRING
      },
      niveau_socioeconomique: {
        type: Sequelize.STRING
      },
      statut_marital: {
        type: Sequelize.STRING
      },
      nbr_femme_pere: {
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
      nbr_repas: {
        type: Sequelize.INTEGER
      },
      consommation_boisson: {
        type: Sequelize.BOOLEAN
      },
      atb: {
        type: Sequelize.BOOLEAN
      },
      liste_atb: {
        type: Sequelize.TEXT
      },
      tbc_chez_parents: {
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
      nom_tuteur: {
        type: Sequelize.STRING
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