'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom_patient: {
        type: Sequelize.STRING
      },
      postnom_patient: {
        type: Sequelize.STRING
      },
      prenom_patient: {
        type: Sequelize.STRING
      },
      sexe_patient: {
        type: Sequelize.STRING
      },
      date_naissance_patient: {
        type: Sequelize.DATEONLY
      },
      adresse_patient: {
        type: Sequelize.TEXT
      },
      provenance_patient: {
        type: Sequelize.STRING
      },
      mode_arrive: {
        type: Sequelize.STRING
      },
      poids_naissance: {
        type: Sequelize.FLOAT
      },
      image_patient: {
        type: Sequelize.TEXT
      },
      telephone: {
        type: Sequelize.STRING
      },
      id_cause_malnutrition: {
        type: Sequelize.INTEGER
      },
      id_famille: {
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
    await queryInterface.dropTable('patients');
  }
};