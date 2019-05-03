// @flow

const GameRoomModel = function(sequelize: Object, DataTypes: Object) {
  var GameRoom = sequelize.define('GameRoom', {
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    boardSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      customType: {
        flowType: 'BoardSize',
      },
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isOwnerBlack: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    komi: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 6.5,
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

  GameRoom.associate = function(models) {
    GameRoom.belongsTo(models.User, {foreignKey: 'ownerID'});
  };

  return GameRoom;
};

module.exports = GameRoomModel;
