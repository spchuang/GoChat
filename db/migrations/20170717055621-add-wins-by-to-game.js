'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Game',
      'winsBy',
      {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: true,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Game', 'winsBy');
  }
};
