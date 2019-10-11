'use strict'

const RefererPathFilter = use('App/Helpers/RefererPathFilter')

class RefererPathParser {
  async handle (data, next) {
    let headers = data.request.headers()
    let referer = headers.referer
    if (typeof(referer) !== 'string' 
            && typeof(headers.origin) === 'string') {
      referer = headers.origin
    }
    
    data.refererPath = RefererPathFilter(referer)
    await next()
  }
}

module.exports = RefererPathParser