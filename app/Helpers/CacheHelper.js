'use strict'

const Cache = use('Adonis/Addons/Cache')

Cache.key = function (...args) {
  return args.filter(arg => {
    return (arg !== null && typeof(arg) !== 'undefined')
  }).map(arg => {
    if (typeof(arg) === 'boolean') {
      if (arg === true) {
        return 1
      }
      else {
        return 0
      }
    }
    else if (typeof(arg) === 'object') {
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

Cache.rememberWaitLocks = {}

Cache.rememberWait = function (tags, cacheKey, minutes, callback) {
  return new Promise(async (resolve, reject) => {
    
    if (typeof(callback) !== 'function' 
            && typeof(minutes) === 'function') {
      callback = minutes
      minutes = cacheKey
      cacheKey = tags
      tags = null
    } 

    // ------------------------------------------
    // 先看看有沒有值

    let cacheQuery
    if (tags !== null) {
      cacheQuery = Cache.tags(tags)
    }
    else {
      cacheQuery = Cache
    }

    if (await cacheQuery.has(cacheKey)) {
      return await cacheQuery.get(cacheKey)
    }

    // ------------------------------------------
    let lockName = buildLockName(tags, cacheKey)
    if (typeof(this.rememberWaitLocks[lockName]) === 'boolean' 
            && this.rememberWaitLocks[lockName] === true) {
      // 被鎖定了
      setTimeout(async () => {
        let result = await this.rememberWait(tags, cacheKey, minutes, callback)
        return resolve(result)
      }, Math.floor(Math.random() * 1000))
      return false
    }
  
    // ------------------------------
    // 如果沒有被鎖定的話
    let result = await cacheQuery.remember(cacheKey, minutes, callback)
    resolve(result)
    return true
  })  // return new Promise((resolve, reject) => {
}

const buildLockName = (tags, cacheKey) => {
  let lockName = []
    if (Array.isArray(tags)) {
      lockName = lockName.concat(tags)
    }
    else if (typeof(tags) !== 'undefined' && tags !== null) {
      lockName.push(tags)
    }
    lockName.push(cacheKey)
    lockName = lockName.join('.')
    return lockName
}

module.exports = Cache