'use strict'
const Env = use('Env')

const isPortFree = port =>
  new Promise(resolve => {
    const server = use('http')
      .createServer()
      .listen(port, () => {
        server.close()
        resolve(true)
      })
      .on('error', () => {
        resolve(false)
      })
  })

let TestServerHelper = async function (group, callback) {
  
  var express = use('express')
  var app = express();

  app.use(express.static('public'))

  let execCallback = () => {
    if (!callback) {
      return false
    }
    
    const uri = '/demo-articles/test-lorem-ipsum-2sections-cors.html?r=' + (new Date()).getTime().toString(36) + '&t=' + group
    const url = 'http://' + Env.get('PUBLIC_HOST') + ':' + Env.get('CORS_PORT') + uri
    callback(url)
  }

  let port = Number(Env.get('CORS_PORT'))
  if (await isPortFree(port)) {
    app.listen(port, function () {
      console.log(`Test server is listening on port ${port}`)
      execCallback()
    })
  }
  else {
    execCallback()
  }
}

module.exports = TestServerHelper