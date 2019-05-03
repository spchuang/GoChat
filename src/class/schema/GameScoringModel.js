// @flow

const GameScoringModel = function(sequelize: Object, DataTypes: Object) {
  var GameScoring = sequelize.define('GameScoring', {
    blackTerritory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    blackCapture: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    whiteTerritory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    whiteCapture: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    board: {
      type: DataTypes.TEXT,
      allowNull: false,
      customType: {
        type: 'JSON',
        flowType: 'Object',
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      customType: {
        flowType: 'GameScoringRequestStatusType',
      },
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  GameScoring.associate = function(models) {
    GameScoring.belongsTo(models.Game, {foreignKey: 'gameID'});
    GameScoring.belongsTo(models.User, {foreignKey: 'creatorID'});
  };

  return GameScoring;
};

module.exports = GameScoringModel;
