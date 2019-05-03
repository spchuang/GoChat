'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'User',
      'locale',
      {
        type: Sequelize.STRING(10),
        allowNull: true,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('User', 'locale');
  }
};
