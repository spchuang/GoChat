'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'Logging',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        userFBID: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userLanguage: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        targetClass: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        targetID: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        event: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        extraData: {
          type: Sequelize.STRING,
          allowNull: true,
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
    queryInterface.dropTable('Logging');
  }
};
