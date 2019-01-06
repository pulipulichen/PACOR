var express = require('express');
var app = express();

var tools = require('./tools');

app.get('/', function (req, res) {
  res.send('Hello World!aaa');
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001aaa!');
  
  tools.foo()
});
