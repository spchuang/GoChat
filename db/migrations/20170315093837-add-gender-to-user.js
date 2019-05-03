'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'User',
      'gender',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('User', 'gender');
  }
};
