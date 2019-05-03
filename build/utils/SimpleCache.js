

'use strict';

/*
 This is simple in memory cache that keeps track of maximum number of entries
*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleCache = function () {
  function SimpleCache() {
    var limit = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];

    _classCallCheck(this, SimpleCache);

    this._limit = limit;
    this._cache = {};
    this._keysOrder = [];
  }

  _createClass(SimpleCache, [{
    key: 'put',
    value: function put(key, value) {
      if (key in this._cache) {
        this._cache[key] = value;
        var index = this._keysOrder.indexOf(key);
        this._keysOrder.splice(index, 1);
        this._keysOrder.push(key);
      } else {
        this._cache[key] = value;
        this._keysOrder.push(key);
      }

      if (this._keysOrder.length > this._limit) {
        var keyToRemove = this._keysOrder.shift();
        delete this._cache[keyToRemove];
      }
    }
  }, {
    key: 'get',
    value: function get(key) {
      var val = this._cache[key];
      if (val === undefined) {
        return null;
      }

      info('Found cache for key ' + key);
      return val;
    }
  }]);

  return SimpleCache;
}();

module.exports = SimpleCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9TaW1wbGVDYWNoZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7Ozs7O0lBTU0sVztBQUlKLHlCQUF3QztBQUFBLFFBQTVCLEtBQTRCLHlEQUFYLEdBQVc7O0FBQUE7O0FBQ3RDLFNBQUssTUFBTCxHQUFjLEtBQWQ7QUFDQSxTQUFLLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0Q7Ozs7d0JBRUcsRyxFQUFhLEssRUFBa0I7QUFDakMsVUFBSSxPQUFPLEtBQUssTUFBaEIsRUFBd0I7QUFDdEIsYUFBSyxNQUFMLENBQVksR0FBWixJQUFtQixLQUFuQjtBQUNBLFlBQU0sUUFBUSxLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBd0IsR0FBeEIsQ0FBZDtBQUNBLGFBQUssVUFBTCxDQUFnQixNQUFoQixDQUF1QixLQUF2QixFQUE4QixDQUE5QjtBQUNBLGFBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixHQUFyQjtBQUNELE9BTEQsTUFLTztBQUNMLGFBQUssTUFBTCxDQUFZLEdBQVosSUFBbUIsS0FBbkI7QUFDQSxhQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsR0FBckI7QUFDRDs7QUFFRCxVQUFJLEtBQUssVUFBTCxDQUFnQixNQUFoQixHQUF5QixLQUFLLE1BQWxDLEVBQTBDO0FBQ3hDLFlBQU0sY0FBYyxLQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsRUFBcEI7QUFDQSxlQUFPLEtBQUssTUFBTCxDQUFZLFdBQVosQ0FBUDtBQUNEO0FBQ0Y7Ozt3QkFFRyxHLEVBQW1CO0FBQ3JCLFVBQU0sTUFBTSxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQVo7QUFDQSxVQUFJLFFBQVEsU0FBWixFQUF1QjtBQUNyQixlQUFPLElBQVA7QUFDRDs7QUFFRCxXQUFLLHlCQUF5QixHQUE5QjtBQUNBLGFBQU8sR0FBUDtBQUNEOzs7Ozs7QUFHSCxPQUFPLE9BQVAsR0FBaUIsV0FBakIiLCJmaWxlIjoiU2ltcGxlQ2FjaGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qXG4gVGhpcyBpcyBzaW1wbGUgaW4gbWVtb3J5IGNhY2hlIHRoYXQga2VlcHMgdHJhY2sgb2YgbWF4aW11bSBudW1iZXIgb2YgZW50cmllc1xuKi9cblxuY2xhc3MgU2ltcGxlQ2FjaGUge1xuICBfbGltaXQ6IG51bWJlcjtcbiAgX2NhY2hlOiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgX2tleXNPcmRlcjogQXJyYXk8c3RyaW5nPjtcbiAgY29uc3RydWN0b3IobGltaXQ/OiBudW1iZXIgPSAxMDApOiB2b2lkIHtcbiAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgdGhpcy5fa2V5c09yZGVyID0gW107XG4gIH1cblxuICBwdXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoa2V5IGluIHRoaXMuX2NhY2hlKSB7XG4gICAgICB0aGlzLl9jYWNoZVtrZXldID0gdmFsdWU7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2tleXNPcmRlci5pbmRleE9mKGtleSk7XG4gICAgICB0aGlzLl9rZXlzT3JkZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMuX2tleXNPcmRlci5wdXNoKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NhY2hlW2tleV0gPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2tleXNPcmRlci5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2tleXNPcmRlci5sZW5ndGggPiB0aGlzLl9saW1pdCkge1xuICAgICAgY29uc3Qga2V5VG9SZW1vdmUgPSB0aGlzLl9rZXlzT3JkZXIuc2hpZnQoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9jYWNoZVtrZXlUb1JlbW92ZV07XG4gICAgfVxuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogP2FueSB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5fY2FjaGVba2V5XTtcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGluZm8oJ0ZvdW5kIGNhY2hlIGZvciBrZXkgJyArIGtleSk7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbXBsZUNhY2hlO1xuIl19