'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'GameScoring',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        gameID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: 'Game',
          referenceKey: 'id'
        },
        blackTerritory: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        blackCapture: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        whiteTerritory: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        whiteCapture: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        board: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        creatorID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: 'User',
          referenceKey: 'id'
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
    queryInterface.dropTable('GameScoring');
  }
};
