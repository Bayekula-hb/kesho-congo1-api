"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("anthropometriques", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      peri_cranien: {
        type: Sequelize.FLOAT,
      },
      peri_brachial: {
        type: Sequelize.FLOAT,
      },
      poids: {
        type: Sequelize.FLOAT,
      },
      taille: {
        type: Sequelize.FLOAT,
      },
      type_malnutrition: {
        type: Sequelize.STRING,
      },
      date_examen: {
        type: Sequelize.DATE,
      },
      id_patient: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          module: "patients",
          key: "id",
        },
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
    await queryInterface.dropTable("anthropometriques");
  },
};
