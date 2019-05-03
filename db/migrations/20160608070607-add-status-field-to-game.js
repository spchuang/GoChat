'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Game',
      'status',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // GameStatus.PLAYING
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Game', 'status');
  }
};
