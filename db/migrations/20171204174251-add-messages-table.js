'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.createTable(
        'Message',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          content: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          senderID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'User',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          receiverID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'User',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
        },
        {
          charset: 'utf8',
          collate: 'utf8_unicode_ci',
          freezeTableName: true,
        }
      ),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.dropTable('Message'),
    ];
  }
};
