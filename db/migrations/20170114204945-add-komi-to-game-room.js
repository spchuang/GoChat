'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'GameRoom',
      'komi',
      {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 4.5,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('GameRoom', 'komi');
  }
};
