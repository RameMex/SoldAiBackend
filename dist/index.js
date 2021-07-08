"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var app = (0, _express["default"])();
app.get('/', function (req, res) {
  res.send('hello world');
});
app.listen(3000);