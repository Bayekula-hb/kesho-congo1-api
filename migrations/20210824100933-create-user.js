'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom_user: {
        type: Sequelize.STRING
      },
      postnom_user: {
        type: Sequelize.STRING
      },
      prenom_user: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      image_user: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.TEXT
      },
      is_admin: {
        type: Sequelize.BOOLEAN
      },
      statut: {
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
    await queryInterface.dropTable('users');
  }
};