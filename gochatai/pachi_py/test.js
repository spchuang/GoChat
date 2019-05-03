var ref = require("ref");
var ffi = require("ffi");

var path = require('path');
var pachiBoard = ref.types.voit;
var pachi = ffi.Library(path.resolve(__dirname, './cypachi.so'), {
  "CreateBoard": ['int', []]
});
var tb=pachi.CreateBoard(19)
