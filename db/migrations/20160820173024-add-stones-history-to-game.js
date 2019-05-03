'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Game',
      'stonesHistory',
      {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Game', 'stonesHistory');
  }
};
