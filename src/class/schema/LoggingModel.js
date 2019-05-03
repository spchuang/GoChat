// @flow

const LoggingModel = function(sequelize: Object, DataTypes: Object) {
  var Logging = sequelize.define('Logging', {
    userFBID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetClass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    targetID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extraData: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  Logging.associate = function(models) {
    Logging.belongsTo(models.User, {foreignKey: 'userID'});
  };

  return Logging;
};

module.exports = LoggingModel;
