'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'User',
      'profilePic',
      {
        type: Sequelize.STRING(2083),
        allowNull: true,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('User', 'profilePic');
  }
};
