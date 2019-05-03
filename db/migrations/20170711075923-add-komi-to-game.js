'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Game',
      'komi',
      {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 6.5,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Game', 'komi');
  }
};
