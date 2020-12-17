var express = require("express");

var app = express();
var server = app.listen(4000, function() {
  console.log("listening to request on port 4000");
});
