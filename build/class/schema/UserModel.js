'use strict';

var _ClassEnums = require('../ClassEnums');

var _ClassEnums2 = _interopRequireDefault(_ClassEnums);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserModel = function UserModel(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fbID: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      customName: 'FBID'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      customType: {
        flowType: 'UserStatusType'
      }
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['zh_tw', 'zh_cn', 'en', 'jp', 'ko']]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profilePic: {
      type: DataTypes.STRING(2083),
      allowNull: true
    },
    locale: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [Object.values(_ClassEnums2.default.Gender)]
      },
      customType: {
        flowType: 'GenderType'
      }
    },
    isAI: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: true });

  // Model tableName will be the same as the model name
  User.associate = function (models) {
    User.belongsTo(models.Game, { foreignKey: 'currentGameID', constraints: false });
  };

  return User;
};

module.exports = UserModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGFzcy9zY2hlbWEvVXNlck1vZGVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7OztBQUVBLElBQU0sWUFBWSxTQUFaLFNBQVksQ0FBUyxTQUFULEVBQTRCLFNBQTVCLEVBQStDO0FBQy9ELE1BQUksT0FBTyxVQUFVLE1BQVYsQ0FBaUIsTUFBakIsRUFBeUI7QUFDbEMsVUFBTTtBQUNKLFlBQU0sVUFBVSxNQURaO0FBRUosY0FBUSxJQUZKO0FBR0osaUJBQVcsS0FIUDtBQUlKLGtCQUFZO0FBSlIsS0FENEI7QUFPbEMsWUFBUTtBQUNOLFlBQU0sVUFBVSxPQURWO0FBRU4saUJBQVcsS0FGTDtBQUdOLGtCQUFZO0FBQ1Ysa0JBQVU7QUFEQTtBQUhOLEtBUDBCO0FBY2xDLGNBQVU7QUFDUixZQUFNLFVBQVUsTUFEUjtBQUVSLGlCQUFXLEtBRkg7QUFHUixnQkFBVTtBQUNSLGNBQU0sQ0FBQyxDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLENBQUQ7QUFERTtBQUhGLEtBZHdCO0FBcUJsQyxlQUFXO0FBQ1QsWUFBTSxVQUFVLE1BRFA7QUFFVCxpQkFBVztBQUZGLEtBckJ1QjtBQXlCbEMsY0FBVTtBQUNSLFlBQU0sVUFBVSxNQURSO0FBRVIsaUJBQVc7QUFGSCxLQXpCd0I7QUE2QmxDLGdCQUFZO0FBQ1YsWUFBTSxVQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FESTtBQUVWLGlCQUFXO0FBRkQsS0E3QnNCO0FBaUNsQyxZQUFRO0FBQ04sWUFBTSxVQUFVLE1BQVYsQ0FBaUIsRUFBakIsQ0FEQTtBQUVOLGlCQUFXO0FBRkwsS0FqQzBCO0FBcUNsQyxZQUFRO0FBQ04sWUFBTSxVQUFVLE9BRFY7QUFFTixpQkFBVyxLQUZMO0FBR04sZ0JBQVU7QUFDUixjQUFNLENBQUMsT0FBTyxNQUFQLENBQWMscUJBQVcsTUFBekIsQ0FBRDtBQURFLE9BSEo7QUFNTixrQkFBWTtBQUNWLGtCQUFVO0FBREE7QUFOTixLQXJDMEI7QUErQ2xDLFVBQU07QUFDSixZQUFNLFVBQVUsT0FEWjtBQUVKLGlCQUFXLEtBRlA7QUFHSixvQkFBYztBQUhWO0FBL0M0QixHQUF6QixFQW9EUjtBQUNELGFBQVMsTUFEUjtBQUVELGFBQVMsaUJBRlI7QUFHRCxxQkFBaUIsSUFIaEIsRUFwRFEsQ0FBWDs7O0FBMERBLE9BQUssU0FBTCxHQUFpQixVQUFTLE1BQVQsRUFBaUI7QUFDaEMsU0FBSyxTQUFMLENBQWUsT0FBTyxJQUF0QixFQUE0QixFQUFDLFlBQVksZUFBYixFQUE4QixhQUFhLEtBQTNDLEVBQTVCO0FBQ0QsR0FGRDs7QUFJQSxTQUFPLElBQVA7QUFDRCxDQWhFRDs7QUFrRUEsT0FBTyxPQUFQLEdBQWlCLFNBQWpCIiwiZmlsZSI6IlVzZXJNb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgQ2xhc3NFbnVtcyBmcm9tICcuLi9DbGFzc0VudW1zJztcblxuY29uc3QgVXNlck1vZGVsID0gZnVuY3Rpb24oc2VxdWVsaXplOiBPYmplY3QsIERhdGFUeXBlczogT2JqZWN0KSB7XG4gIHZhciBVc2VyID0gc2VxdWVsaXplLmRlZmluZSgnVXNlcicsIHtcbiAgICBmYklEOiB7XG4gICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgdW5pcXVlOiB0cnVlLFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIGN1c3RvbU5hbWU6ICdGQklEJyxcbiAgICB9LFxuICAgIHN0YXR1czoge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgY3VzdG9tVHlwZToge1xuICAgICAgICBmbG93VHlwZTogJ1VzZXJTdGF0dXNUeXBlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBsYW5ndWFnZToge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBpc0luOiBbWyd6aF90dycsICd6aF9jbicsICdlbicsICdqcCcsICdrbyddXSxcbiAgICAgIH1cbiAgICB9LFxuICAgIGZpcnN0TmFtZToge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICB9LFxuICAgIGxhc3ROYW1lOiB7XG4gICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgIH0sXG4gICAgcHJvZmlsZVBpYzoge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORygyMDgzKSxcbiAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICB9LFxuICAgIGxvY2FsZToge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORygxMCksXG4gICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgfSxcbiAgICBnZW5kZXI6IHtcbiAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIGlzSW46IFtPYmplY3QudmFsdWVzKENsYXNzRW51bXMuR2VuZGVyKV0sXG4gICAgICB9LFxuICAgICAgY3VzdG9tVHlwZToge1xuICAgICAgICBmbG93VHlwZTogJ0dlbmRlclR5cGUnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGlzQUk6IHtcbiAgICAgIHR5cGU6IERhdGFUeXBlcy5CT09MRUFOLFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgfSxcbiAgfSwge1xuICAgIGNoYXJzZXQ6ICd1dGY4JyxcbiAgICBjb2xsYXRlOiAndXRmOF91bmljb2RlX2NpJyxcbiAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsIC8vIE1vZGVsIHRhYmxlTmFtZSB3aWxsIGJlIHRoZSBzYW1lIGFzIHRoZSBtb2RlbCBuYW1lXG4gIH0pO1xuXG4gIFVzZXIuYXNzb2NpYXRlID0gZnVuY3Rpb24obW9kZWxzKSB7XG4gICAgVXNlci5iZWxvbmdzVG8obW9kZWxzLkdhbWUsIHtmb3JlaWduS2V5OiAnY3VycmVudEdhbWVJRCcsIGNvbnN0cmFpbnRzOiBmYWxzZX0pO1xuICB9O1xuXG4gIHJldHVybiBVc2VyO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBVc2VyTW9kZWw7XG4iXX0=