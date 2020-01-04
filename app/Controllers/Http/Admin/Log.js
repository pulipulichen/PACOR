'use strict'

// http://localhost:3333/admin/Development/avatars

const Env = use('Env')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const Helpers = use('Helpers')
const fs = use('fs')

const RemoteConsoleLog = use('App/Models/RemoteConsoleLog')

class Log {
  async create({request, response}) {
    const message = request.all()
    
    const log = new RemoteConsoleLog()
    log.message = message
    log.user = request.connection.remoteAddress
    
    let headers = request.headers()
    let referer = headers.referer
    if (typeof(referer) !== 'string' 
            && typeof(headers.origin) === 'string') {
      referer = headers.origin
    }
    log.referer = referer
    await log.save()
    
    return log.id
  }
  
  async get({request, response}) {
    const {afterTime} = request.all()
    return RemoteConsoleLog.list(afterTime)
  }
}

module.exports = Log
