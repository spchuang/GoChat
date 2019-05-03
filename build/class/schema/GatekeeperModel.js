'use strict';

var _CommonUtils = require('../../utils/CommonUtils');

var _CommonUtils2 = _interopRequireDefault(_CommonUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GatekeeperModel = function GatekeeperModel(sequelize, DataTypes) {
  var Gatekeeper = sequelize.define('Gatekeeper', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    rules: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isJson: _CommonUtils2.default.isJson
      }
    },
    userIDWhitelist: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isArray: function isArray(val) {
          return Array.isArray(val);
        }
      }
    },
    userIDBlacklist: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isArray: function isArray(val) {
          return Array.isArray(val);
        }
      }
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: true });

  // Model tableName will be the same as the model name
  return Gatekeeper;
};

module.exports = GatekeeperModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGFzcy9zY2hlbWEvR2F0ZWtlZXBlck1vZGVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7OztBQUVBLElBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQVMsU0FBVCxFQUE0QixTQUE1QixFQUErQztBQUNyRSxNQUFJLGFBQWEsVUFBVSxNQUFWLENBQWlCLFlBQWpCLEVBQStCO0FBQzlDLFVBQU07QUFDSixZQUFNLFVBQVUsTUFEWjtBQUVKLGNBQVEsSUFGSjtBQUdKLGlCQUFXO0FBSFAsS0FEd0M7QUFNOUMsV0FBTztBQUNMLFlBQU0sVUFBVSxJQURYO0FBRUwsaUJBQVcsS0FGTjtBQUdMLGdCQUFVO0FBQ1IsZ0JBQVEsc0JBQVc7QUFEWDtBQUhMLEtBTnVDO0FBYTlDLHFCQUFpQjtBQUNmLFlBQU0sVUFBVSxJQUREO0FBRWYsaUJBQVcsS0FGSTtBQUdmLGdCQUFVO0FBQ1IsaUJBQVMsaUJBQUMsR0FBRCxFQUEwQjtBQUNqQyxpQkFBTyxNQUFNLE9BQU4sQ0FBYyxHQUFkLENBQVA7QUFDRDtBQUhPO0FBSEssS0FiNkI7QUFzQjlDLHFCQUFpQjtBQUNmLFlBQU0sVUFBVSxJQUREO0FBRWYsaUJBQVcsSUFGSTtBQUdmLGdCQUFVO0FBQ1IsaUJBQVMsaUJBQUMsR0FBRCxFQUEwQjtBQUNqQyxpQkFBTyxNQUFNLE9BQU4sQ0FBYyxHQUFkLENBQVA7QUFDRDtBQUhPO0FBSEs7QUF0QjZCLEdBQS9CLEVBK0JkO0FBQ0QsYUFBUyxNQURSO0FBRUQsYUFBUyxpQkFGUjtBQUdELHFCQUFpQixJQUhoQixFQS9CYyxDQUFqQjs7O0FBcUNBLFNBQU8sVUFBUDtBQUNELENBdkNEOztBQXlDQSxPQUFPLE9BQVAsR0FBaUIsZUFBakIiLCJmaWxlIjoiR2F0ZWtlZXBlck1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuaW1wb3J0IENvbW1vblV0aWwgZnJvbSAnLi4vLi4vdXRpbHMvQ29tbW9uVXRpbHMnO1xuXG5jb25zdCBHYXRla2VlcGVyTW9kZWwgPSBmdW5jdGlvbihzZXF1ZWxpemU6IE9iamVjdCwgRGF0YVR5cGVzOiBPYmplY3QpIHtcbiAgdmFyIEdhdGVrZWVwZXIgPSBzZXF1ZWxpemUuZGVmaW5lKCdHYXRla2VlcGVyJywge1xuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICB1bmlxdWU6IHRydWUsXG4gICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIHR5cGU6IERhdGFUeXBlcy5URVhULFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIGlzSnNvbjogQ29tbW9uVXRpbC5pc0pzb24sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdXNlcklEV2hpdGVsaXN0OiB7XG4gICAgICB0eXBlOiBEYXRhVHlwZXMuVEVYVCxcbiAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBpc0FycmF5OiAodmFsOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVzZXJJREJsYWNrbGlzdDoge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlRFWFQsXG4gICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBpc0FycmF5OiAodmFsOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LCB7XG4gICAgY2hhcnNldDogJ3V0ZjgnLFxuICAgIGNvbGxhdGU6ICd1dGY4X3VuaWNvZGVfY2knLFxuICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSwgLy8gTW9kZWwgdGFibGVOYW1lIHdpbGwgYmUgdGhlIHNhbWUgYXMgdGhlIG1vZGVsIG5hbWVcbiAgfSk7XG5cbiAgcmV0dXJuIEdhdGVrZWVwZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdhdGVrZWVwZXJNb2RlbDtcbiJdfQ==