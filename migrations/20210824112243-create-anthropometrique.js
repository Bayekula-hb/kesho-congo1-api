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
      id_anthropometrique: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
      },
      peri_cranien: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      peri_brachial: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      poids: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      taille: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      type_malnutrition: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_examen: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue : Sequelize.NOW,
      },
      patientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "patients",
          key: "id",
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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