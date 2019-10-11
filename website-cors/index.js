var express = require('express')
var serveStatic = require('serve-static')
var path = require('path')
 
var app = express()
 
app.use(serveStatic(path.resolve(__dirname, 'public'), { 'index': ['index.html'] }))
app.listen(3000)
console.log('CORS website: http://127.0.0.1:3000')