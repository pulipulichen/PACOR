'use strict'

class Asset {
  async get ({request, params, Drive}) {
    await Drive.put('hello.txt', Buffer.from('Hello world!'))
    
    let id = params.id
    let zipPath = '/' + request.url().split('/').slice(4).join('/')
    return zipPath
  }
}

module.exports = Asset
