'use strict'

const OriginFilter = use('App/Helpers/OriginFilter')

class OriginParser {
  async handle (data, next) {
    let headers = data.request.headers()
    let origin = headers.origin
    if (typeof(origin) !== 'string' 
            && typeof(headers.referer) === 'string') {
      origin = headers.referer.split('/').slice(0,3).join('/')
    }
    
    origin = OriginFilter(origin)
    data.origin = origin
    await next()
  }
}

module.exports = OriginParser