'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'Gatekeeper',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        rules: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        userIDWhitelist: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        userIDBlacklist: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
      },
      {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        freezeTableName: true,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Gatekeeper');
  }
};
