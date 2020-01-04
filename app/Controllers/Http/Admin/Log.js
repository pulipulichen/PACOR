'use strict'

// http://localhost:3333/admin/Development/avatars

const Env = use('Env')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const Helpers = use('Helpers')
const fs = use('fs')

const RemoteConsoleLog = use('App/Models/RemoteConsoleLog')

class Log {
  async create({request, response}) {
    const {message, type} = request.all()
    
    const log = new RemoteConsoleLog()
    
    if (Array.isArray(message)) {
      message = message.join('\n')
    }
    if (typeof(message) === 'object') {
      message = JSON.stringify(message, null, 2)
    }
    
    log.message = message
    log.type = type
    
//    let ip = request.headers['x-forwarded-for'] || 
//     (request.connection && request.connection.remoteAddress) || 
//     (request.socket && request.socket.remoteAddress) ||
//     ((request.connection && request.connection.socket) ? request.connection.socket.remoteAddress : null);
    let ip = request.ip()
    log.user = ip
    
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
