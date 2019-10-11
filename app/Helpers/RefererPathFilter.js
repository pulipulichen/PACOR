'use strict'

const Config = use('Config')
let directoryIndexMapping = Config.get('referer.directoryIndexMapping')

let RefererPathFilter = function (referer) {
  
  if (typeof(referer) !== 'string') {
    return '/'
  }

  let refererPath = '/' + referer.split('/').slice(3).join('/')

  for (let i = 0; i < directoryIndexMapping.length; i++) {
    let needle = directoryIndexMapping[i]
    if (refererPath.startsWith(needle) === true) {
      refererPath = '/' + refererPath.slice(needle.length)
      break
    }
  }

  return refererPath
}

module.exports = RefererPathFilter