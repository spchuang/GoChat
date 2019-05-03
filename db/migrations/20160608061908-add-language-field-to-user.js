'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'User',
      'language',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'en',
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('User', 'language');
  }
};
