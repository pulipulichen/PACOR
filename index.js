var express = require('express')
var app = express()

var tools = require('./tools')

app.get('/', function (req, res) {
  res.send('Hello World!')
})

console.log(111 * 2 + 3)

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')

  tools.foo()
})
