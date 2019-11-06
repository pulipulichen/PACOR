'use strict'

const Cache = use('Adonis/Addons/Cache')

let stringifyArray = (array) => {
  return array.map(item => {
    if (Array.isArray(item)) {
      return stringifyArray(item)
    }
    else if (item !== null && typeof(item) === 'object') {
      return stringifyObject(item)
    }
    else {
      return item
    }
  }).join('.')
}

let stringifyObject = (object) => {
  return Object.keys(object).map(key => {
    let item = object[key]
    
    if (Array.isArray(item)) {
      return stringifyArray(item)
    }
    else if (item !== null && typeof(item) === 'object') {
      return stringifyObject(item)
    }
    else {
      return item
    }
  }).join('.')
}

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
      else if (Array.isArray(arg)) {
        return stringifyArray(arg)
      }
      else if (arg !== null && typeof(arg) === 'object') {
        return stringifyObject(arg)
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
Cache.rememberWaitLocksMS = 1000

Cache.rememberWait = function (tags, cacheKey, minutes, callback) {
  if (typeof(tags) === 'string'
            && typeof(cacheKey) === 'function'
            && minutes === undefined) {
    return this.rememberForeverWait(null, tags, cacheKey)
  }
  else if ((typeof(tags) === 'string' || Array.isArray(tags))
            && typeof(cacheKey) === 'string'
            && typeof(minutes) === 'function'
            && callback === undefined) {
    return this.rememberForeverWait(tags, cacheKey, minutes)
  }
  else if (typeof(callback) !== 'function' 
          && typeof(minutes) === 'function') {
    callback = minutes
    minutes = cacheKey
    cacheKey = tags
    tags = null
  }
  
  if (tags !== null && tags !== undefined) {
    tags = [tags]
  }
  if (Array.isArray(tags)) {
    tags = filterTags(tags)
  }
  
  return new Promise(async (resolve, reject) => {
    
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
      let result = await cacheQuery.get(cacheKey)
      resolve(result)
      return true
    }

    // ------------------------------------------
    let lockName = buildLockName(tags, cacheKey)
    
    if (typeof(this.rememberWaitLocks[lockName]) === 'boolean' 
            && this.rememberWaitLocks[lockName] === true) {
      // 被鎖定了
      //console.log('被鎖定了', lockName)
      setTimeout(async () => {
        //console.log('再次嘗試')
        let result = await this.rememberWait(tags, cacheKey, minutes, callback)
        //console.log('鎖定解除', result)
        resolve(result)
        return true
      }, Math.floor(Math.random() * this.rememberWaitLocksMS))
      return false
    }
    else {
      this.rememberWaitLocks[lockName] = true
    }
  
    // ------------------------------
    // 如果沒有被鎖定的話
    let result = await cacheQuery.remember(cacheKey, minutes, callback)
    delete this.rememberWaitLocks[lockName]
    //console.log(this.rememberWaitLocks)
    resolve(result)
    return true
  })  // return new Promise((resolve, reject) => {
}

Cache.rememberForeverWait = function (tags, cacheKey, callback) {
  return new Promise(async (resolve, reject) => {
    
    if (typeof(callback) !== 'function' 
            && typeof(cacheKey) === 'function') {
      callback = cacheKey
      cacheKey = tags
      tags = null
    }
    
    if (tags !== null && tags !== undefined) {
      tags = [tags]
    }
    if (Array.isArray(tags)) {
      tags = filterTags(tags)
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
      let result = await cacheQuery.get(cacheKey)
      resolve(result)
      return true
    }

    // ------------------------------------------
    let lockName = buildLockName(tags, cacheKey)
    
    if (typeof(this.rememberWaitLocks[lockName]) === 'boolean' 
            && this.rememberWaitLocks[lockName] === true) {
      // 被鎖定了
      //console.log('被鎖定了', lockName)
      setTimeout(async () => {
        //console.log('再次嘗試')
        let result = await this.rememberForeverWait(tags, cacheKey, callback)
        //console.log('鎖定解除', result)
        resolve(result)
        return true
      }, Math.floor(Math.random() * this.rememberWaitLocksMS))
      return false
    }
    else {
      this.rememberWaitLocks[lockName] = true
    }
  
    // ------------------------------
    // 如果沒有被鎖定的話
    let result = await cacheQuery.rememberForever(cacheKey, callback)
    delete this.rememberWaitLocks[lockName]
    //console.log(this.rememberWaitLocks)
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

const filterTags = (tags) => {
  return tags.map(tag => {
    if (typeof(tag) === 'object'
            && typeof(tag.primaryKeyValue) === 'number') {
      return tag.constructor.name + '_' + tag.primaryKeyValue
    }
    else {
      return tag
    }
  })
}

module.exports = Cache