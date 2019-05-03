// @flow

const GameModel = function(sequelize: Object, DataTypes: Object) {
  var Game = sequelize.define('Game', {
    isBlackTurn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    weiqiConsecutivePasses:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weiqiHistory: {
      type: DataTypes.TEXT,
      allowNull: false,
      customType: {
        type: 'JSON',
        flowType: 'Object',
      },
    },
    weiqiBoard:{
      type: DataTypes.TEXT,
      allowNull: false,
      customType: {
        type: 'JSON',
        flowType: 'Object',
      },
    },
    weiqiBoardSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      customType: {
        flowType: 'BoardSize',
      },
    },
    stonesHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
      customType: {
        type: 'JSON',
        flowType: 'Array<StoneMove>',
      },
    },
    boardImageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      customType: {
        flowType: 'GameStatusType',
      },
    },
    komi: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 6.5,
    },
    winsBy: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    handicap: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  Game.associate = function(models) {
    Game.belongsTo(models.User, {foreignKey: 'whiteUserID'});
    Game.belongsTo(models.User, {foreignKey: 'blackUserID'});
  };

  return Game;
};

module.exports = GameModel;
