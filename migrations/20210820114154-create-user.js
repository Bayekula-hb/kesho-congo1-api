'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id_user: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nom_user: {
        allowNull: false,
        type: Sequelize.STRING
      },
      postnom_user: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prenom_user: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_admin: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      password: {
        allowNull: false,
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