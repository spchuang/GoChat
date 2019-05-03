// @flow
import ClassEnums from '../ClassEnums';

const UserModel = function(sequelize: Object, DataTypes: Object) {
  var User = sequelize.define('User', {
    fbID: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      customName: 'FBID',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      customType: {
        flowType: 'UserStatusType',
      },
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['zh_tw', 'zh_cn', 'en', 'jp', 'ko']],
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePic: {
      type: DataTypes.STRING(2083),
      allowNull: true,
    },
    locale: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [Object.values(ClassEnums.Gender)],
      },
      customType: {
        flowType: 'GenderType',
      },
    },
    isAI: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  User.associate = function(models) {
    User.belongsTo(models.Game, {foreignKey: 'currentGameID', constraints: false});
  };

  return User;
};

module.exports = UserModel;
