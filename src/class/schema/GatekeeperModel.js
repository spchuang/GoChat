// @flow

import CommonUtil from '../../utils/CommonUtils';

const GatekeeperModel = function(sequelize: Object, DataTypes: Object) {
  var Gatekeeper = sequelize.define('Gatekeeper', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    rules: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isJson: CommonUtil.isJson,
      },
    },
    userIDWhitelist: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isArray: (val: string): boolean => {
          return Array.isArray(val);
        },
      },
    },
    userIDBlacklist: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isArray: (val: string): boolean => {
          return Array.isArray(val);
        },
      },
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  return Gatekeeper;
};

module.exports = GatekeeperModel;
