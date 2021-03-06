'use strict';

var LoggingModel = function LoggingModel(sequelize, DataTypes) {
  var Logging = sequelize.define('Logging', {
    userFBID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userLanguage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    targetClass: {
      type: DataTypes.STRING,
      allowNull: true
    },
    targetID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false
    },
    extraData: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: true });

  // Model tableName will be the same as the model name
  Logging.associate = function (models) {
    Logging.belongsTo(models.User, { foreignKey: 'userID' });
  };

  return Logging;
};

module.exports = LoggingModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGFzcy9zY2hlbWEvTG9nZ2luZ01vZGVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFTLFNBQVQsRUFBNEIsU0FBNUIsRUFBK0M7QUFDbEUsTUFBSSxVQUFVLFVBQVUsTUFBVixDQUFpQixTQUFqQixFQUE0QjtBQUN4QyxjQUFVO0FBQ1IsWUFBTSxVQUFVLE1BRFI7QUFFUixpQkFBVztBQUZILEtBRDhCO0FBS3hDLGtCQUFjO0FBQ1osWUFBTSxVQUFVLE1BREo7QUFFWixpQkFBVztBQUZDLEtBTDBCO0FBU3hDLGlCQUFhO0FBQ1gsWUFBTSxVQUFVLE1BREw7QUFFWCxpQkFBVztBQUZBLEtBVDJCO0FBYXhDLGNBQVU7QUFDUixZQUFNLFVBQVUsT0FEUjtBQUVSLGlCQUFXO0FBRkgsS0FiOEI7QUFpQnhDLFdBQU87QUFDTCxZQUFNLFVBQVUsTUFEWDtBQUVMLGlCQUFXO0FBRk4sS0FqQmlDO0FBcUJ4QyxlQUFXO0FBQ1QsWUFBTSxVQUFVLElBRFA7QUFFVCxpQkFBVztBQUZGO0FBckI2QixHQUE1QixFQXlCWDtBQUNELGFBQVMsTUFEUjtBQUVELGFBQVMsaUJBRlI7QUFHRCxxQkFBaUIsSUFIaEIsRUF6QlcsQ0FBZDs7O0FBK0JBLFVBQVEsU0FBUixHQUFvQixVQUFTLE1BQVQsRUFBaUI7QUFDbkMsWUFBUSxTQUFSLENBQWtCLE9BQU8sSUFBekIsRUFBK0IsRUFBQyxZQUFZLFFBQWIsRUFBL0I7QUFDRCxHQUZEOztBQUlBLFNBQU8sT0FBUDtBQUNELENBckNEOztBQXVDQSxPQUFPLE9BQVAsR0FBaUIsWUFBakIiLCJmaWxlIjoiTG9nZ2luZ01vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuY29uc3QgTG9nZ2luZ01vZGVsID0gZnVuY3Rpb24oc2VxdWVsaXplOiBPYmplY3QsIERhdGFUeXBlczogT2JqZWN0KSB7XG4gIHZhciBMb2dnaW5nID0gc2VxdWVsaXplLmRlZmluZSgnTG9nZ2luZycsIHtcbiAgICB1c2VyRkJJRDoge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgfSxcbiAgICB1c2VyTGFuZ3VhZ2U6IHtcbiAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgIH0sXG4gICAgdGFyZ2V0Q2xhc3M6IHtcbiAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgfSxcbiAgICB0YXJnZXRJRDoge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgfSxcbiAgICBldmVudDoge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgfSxcbiAgICBleHRyYURhdGE6IHtcbiAgICAgIHR5cGU6IERhdGFUeXBlcy5URVhULFxuICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgIH0sXG4gIH0sIHtcbiAgICBjaGFyc2V0OiAndXRmOCcsXG4gICAgY29sbGF0ZTogJ3V0ZjhfdW5pY29kZV9jaScsXG4gICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLCAvLyBNb2RlbCB0YWJsZU5hbWUgd2lsbCBiZSB0aGUgc2FtZSBhcyB0aGUgbW9kZWwgbmFtZVxuICB9KTtcblxuICBMb2dnaW5nLmFzc29jaWF0ZSA9IGZ1bmN0aW9uKG1vZGVscykge1xuICAgIExvZ2dpbmcuYmVsb25nc1RvKG1vZGVscy5Vc2VyLCB7Zm9yZWlnbktleTogJ3VzZXJJRCd9KTtcbiAgfTtcblxuICByZXR1cm4gTG9nZ2luZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTG9nZ2luZ01vZGVsO1xuIl19