'use strict'

let request = require('request')
let cheerio = require('cheerio')
//let http = require('follow-redirects').http
//let https = require('follow-redirects').https
//let https = require('https')
let iconv = require('iconv-lite')

let CrawlerHelper = {
  getTitle: function (url) {
    return new Promise ((resolve, reject) => {
      let urlObject
      try {
        urlObject = new URL(url)
      } catch (e) {
        return reject(e)
      }

      //console.log(url)
      this._requestBody(url, (body) => {
        //console.log(body)
        if (body === undefined) {
          return reject('body is undefined')
        }

        let bodyStr = body.toString()
        if (bodyStr !== body) {
          body = bodyStr
        }
        body = this._decodeHTML(body)
        //console.log(body)

        let $ = cheerio.load(body)
        let title = this._parseTitle($, urlObject.host)
        return resolve(title)
      })
    })
  },
  _requestBody: function (url, callback) {
    
    let encoding = null
    
    if (url.startsWith('https://webatm.post.gov.tw/')) {
      encoding = 'binary'
    }
    //url = encodeURI(url)
    //console.log(url)
    request({
      url: url,
      //encoding: 'binary',
      encoding: encoding,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        if (typeof (callback) === 'function') {
          callback(body)
        }
      } else {
        //alert(error)
        console.log(error)
        if (typeof(response) === 'object' 
                && typeof(response.statusCode) !== 'undefined') {
          console.log(['statusCode', response.statusCode])
        }
        //console.log(body.toString())
        //$('body').removeClass('loading')
        //console.error(error)
        if (typeof (callback) === 'function') {
          callback()
        }
      }
    })
  },
  _parseTitle: function ($, defaultValue) {
    let title = $("title").text().trim()
    if ('' === title.trim()) {
      title = defaultValue
    }
    return title
  },
  _parseDescription: function ($, defaultValue) {
    let desc = $('meta[name="description"]').attr('content')
    if (desc === undefined) {
      desc = $("title").text().trim()
      if ('' === desc.trim()) {
        desc = defaultValue
      }
    }
    //desc = PathHelper.safeFilter(desc)
    if (desc.length > 50) {
      desc = desc.slice(0, 50).trim()
    }
    return desc
  },
  _decodeHTML: function (body) {
    //console.log(body)
    if (body.indexOf('content="text/html; charset=big5"') > -1
            || (body.indexOf('CONTENT="text/html; charset=big5"') > -1)) {
      //console.log(body)
      //console.log(iconv.decode(body, 'Big5').toString())
      //console.log(iconv.decode(body, 'UTF8').toString())
      body = iconv.decode(body, 'BIG5').toString()
      //console.log('decode')
    }
    //console.log(body)
    return body.trim()
  }
}

module.exports = CrawlerHelper