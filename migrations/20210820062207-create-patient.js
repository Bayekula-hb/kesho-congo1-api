'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patients', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      id_patient: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nom_patient: {
        allowNull: false,
        type: Sequelize.STRING
      },
      postnom_patient: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prenom_patient: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sexe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      provenance_patient: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mode_arrive: {
        allowNull: false,
        type: Sequelize.STRING
      },
      poids_naissance: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      fin_allaitement: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      mois_fin_allaitement: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      diversification_aliment: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      constitution_aliment: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      telephone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_cause_malnutrition: {
        allowNull: false,
        type: Sequelize.STRING,
        references:{
          model:"cause_malnutrition",
          key:"id_cause_malnutrition"
        }
      },
      id_famille: {
        allowNull: false,
        type: Sequelize.STRING,
        references:{
          model:"famille",
          key:"id_famille"
        }
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