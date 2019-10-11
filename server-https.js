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

// https server
// For more information: https://adonisjs.com/recipes/4.1/using-https

const { Ignitor } = require('@adonisjs/ignitor')

require('dotenv').config({ path: '.env.https' })

const https = require('https')

const fs = require('fs')
const path = require('path')

// https://www.reddit.com/r/javascript/comments/9uju8v/is_there_a_way_to_wrap_an_asynchronous_function/e9lujib/
;(async () => {
  let options = {}
  if (fs.existsSync(path.resolve(__dirname, './config/cert/private.key')) === true 
          && fs.existsSync(path.resolve(__dirname, './config/cert/certificate.crt')) === true ) {
    options = {
      key: fs.readFileSync(path.join(__dirname, 'config/cert/private.key')),
      cert: fs.readFileSync(path.join(__dirname, './config/cert/certificate.crt'))
    }
  }
  else {
    const pem = require('pem')
    let keys = await pem.createCertificate({ days: 1, selfSigned: true })
    
    options = {
      key: keys.serviceKey,
      cert: keys.certificate
    }
  }
  
  new Ignitor(require('@adonisjs/fold'))
      .appRoot(__dirname)
      .fireHttpServer((handler) => {
        return https.createServer(options, handler)
      })
      .catch(console.error)
})()