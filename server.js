/* global __dirname */

'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstrap Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass relative path from the project root.
*/

const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer(() => {
    let paddingZero = (n) => {
      if (n < 10) {
        n = '0' + n
      }
      return n
    }
    let date = new Date
    let seconds = paddingZero(date.getSeconds())
    let minutes = paddingZero(date.getMinutes())
    let hour = paddingZero(date.getHours())
    console.log(`AdonisJs server started at ${hour}:${minutes}:${seconds}.`)
  })
  .catch(console.error)