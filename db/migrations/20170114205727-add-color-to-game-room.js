'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'GameRoom',
      'isOwnerBlack',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('GameRoom', 'isOwnerBlack');
  }
};
