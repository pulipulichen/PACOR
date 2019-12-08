'use strict'

const OriginFilter = use('App/Helpers/OriginFilter')
const Env = use('Env')

class OriginParser {
  async handle (data, next) {
    let headers = data.request.headers()
    let origin = headers.origin
    if (typeof(origin) !== 'string' 
            && typeof(headers.referer) === 'string') {
      if (headers.referer.startsWith('/') && !headers.referer.startsWith('//')) {
        origin = Env.get('APP_URL')
      }
      else {
        origin = headers.referer.split('/').slice(0,3).join('/')
      }
    }
    
    origin = OriginFilter(origin)
    data.origin = origin
    await next()
  }
}

module.exports = OriginParser