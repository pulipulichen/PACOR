'use strict'

const WebpageModel = use('App/Models/Webpage')

class WebpageParser {
  async handle (data, next) {
    let headers = data.request.headers()
    let referer = headers.referer
    if (typeof(referer) !== 'string' 
            && typeof(headers.origin) === 'string') {
      referer = headers.origin
    }
    
    data.webpage = await WebpageModel.findByURL(referer)
    await next()
  }
}

module.exports = WebpageParser