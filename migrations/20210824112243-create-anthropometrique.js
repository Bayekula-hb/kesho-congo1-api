'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('anthropometriques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      peri_cranien: {
        type: Sequelize.FLOAT
      },
      peri_brachial: {
        type: Sequelize.FLOAT
      },
      poids: {
        type: Sequelize.FLOAT
      },
      taille: {
        type: Sequelize.FLOAT
      },
      type_malnutrition: {
        type: Sequelize.STRING
      },
      date_examen: {
        type: Sequelize.DATEONLY
      },
      id_patient: {
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
    await queryInterface.dropTable('anthropometriques');
  }
};