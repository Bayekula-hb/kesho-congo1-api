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
      id_patient: {
        type: Sequelize.STRING
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
      sexe: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
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
      fin_allaitement: {
        type: Sequelize.BOOLEAN
      },
      mois_fin_allaitement: {
        type: Sequelize.INTEGER
      },
      diversification_aliment: {
        type: Sequelize.INTEGER
      },
      constitution_aliment: {
        type: Sequelize.TEXT
      },
      telephone: {
        type: Sequelize.STRING
      },
      id_cause_malnutrition: {
        type: Sequelize.STRING
      },
      id_famille: {
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
    await queryInterface.dropTable('patients');
  }
};