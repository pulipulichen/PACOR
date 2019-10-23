'use strict'

const Cache = use('Adonis/Addons/Cache')

Cache.key = function (...args) {
  return args.filter(arg => {
    return (arg !== null && typeof(arg) !== 'undefined')
  }).map(arg => {
    if (typeof(arg) === 'object') {
      if (typeof(arg.primaryKeyValue) === 'number') {
        return arg.primaryKeyValue
      }
      else {
        return JSON.stringify(arg)
      }
    }
    else {
      return arg
    }
  }).join('.')
}

module.exports = Cache