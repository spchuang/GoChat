'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'Game',
        'handicap',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        'GameRoom',
        'handicap',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        }
      ),
    ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Game', 'handicap'),
      queryInterface.removeColumn('GameRoom', 'handicap'),
    ];
  }
};
