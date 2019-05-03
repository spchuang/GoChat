'use strict';

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function getRandomGameCode() {
  var text = '';
  var possible = '0123456789';

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

module.exports = {
  isJson: isJson,
  getRandomGameCode: getRandomGameCode
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9Db21tb25VdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFNBQVMsTUFBVCxDQUFnQixHQUFoQixFQUFzQztBQUNwQyxNQUFJO0FBQ0YsU0FBSyxLQUFMLENBQVcsR0FBWDtBQUNELEdBRkQsQ0FFRSxPQUFPLENBQVAsRUFBVTtBQUNWLFdBQU8sS0FBUDtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7O0FBRUQsU0FBUyxpQkFBVCxHQUFxQztBQUNuQyxNQUFJLE9BQU8sRUFBWDtBQUNBLE1BQU0sV0FBVyxZQUFqQjs7QUFFQSxPQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxDQUFuQixFQUFzQixHQUF0QixFQUEyQjtBQUN6QixZQUFRLFNBQVMsTUFBVCxDQUFnQixLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsU0FBUyxNQUFwQyxDQUFoQixDQUFSO0FBQ0Q7O0FBRUQsU0FBTyxJQUFQO0FBQ0Q7O0FBRUQsT0FBTyxPQUFQLEdBQWlCO0FBQ2YsZ0JBRGU7QUFFZjtBQUZlLENBQWpCIiwiZmlsZSI6IkNvbW1vblV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuZnVuY3Rpb24gaXNKc29uKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHRyeSB7XG4gICAgSlNPTi5wYXJzZShzdHIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21HYW1lQ29kZSgpOiBzdHJpbmcge1xuICBsZXQgdGV4dCA9ICcnO1xuICBjb25zdCBwb3NzaWJsZSA9ICcwMTIzNDU2Nzg5JztcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG4gIH1cblxuICByZXR1cm4gdGV4dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzSnNvbixcbiAgZ2V0UmFuZG9tR2FtZUNvZGUsXG59O1xuIl19