// @flow

const Model = function(sequelize: Object, DataTypes: Object) {
  var model = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  model.associate = function(models) {
    model.belongsTo(models.User, {foreignKey: 'senderID'});
    model.belongsTo(models.User, {foreignKey: 'receiverID'});
  };

  return model;
};

module.exports = Model;
