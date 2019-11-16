'use strict'

const Config = use('Config')

/**
 * https://www.npmjs.com/package/adonis-cache
 */
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
  
  if (tags !== null && tags !== undefined && Array.isArray(tags) === false) {
    tags = [tags]
  }
  if (Array.isArray(tags)) {
    tags = filterTags(tags)
  }
  
  return new Promise(async (resolve, reject) => {
    if (Config.get('cache.default') === 'null' 
            || Config.get('cache.default') === null) {
      let result = await callback()
      return resolve(result)
    }
  
    
    // ------------------------------------------
    // 先看看有沒有值

    let cacheQuery
    if (tags !== null) {
      //console.log(tags)
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
    
    if (Config.get('cache.default') === 'null' 
            || Config.get('cache.default') === null) {
      let result = await callback()
      return resolve(result)
    }
    
    if (tags !== null && tags !== undefined && Array.isArray(tags) === false) {
      tags = [tags]
    }
    if (Array.isArray(tags)) {
      tags = filterTags(tags)
    }

    // ------------------------------------------
    // 先看看有沒有值

    let cacheQuery
    if (tags !== null) {
      //conosle.log(tags)
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
  let output = []
  
  let domainTag
  
  output = tags.map(tag => {
    //console.log(tag.constructor.name, typeof(tag) === 'object', typeof(tag.primaryKeyValue))
    if (typeof(tag) === 'object') {
      if (!domainTag && typeof(tag.domain_id) === 'number') {
        domainTag = 'Domain_' + tag.domain_id
      }
      if (typeof(tag.primaryKeyValue) === 'number') {
        return tag.constructor.name + '_' + tag.primaryKeyValue
      }
    }
    else {
      return tag
    }
  })
  
  if (domainTag) {
    output.unshift(domainTag)
  }
  
  return output
}

/**
 * @deprecated 20191117 應該要捨棄不使用
 */
Cache.buildTags = (webpage, user, instance) => {
  //console.log([webpage, user, instance])
  if (webpage !== undefined 
          && user === undefined
          && instance === undefined) {
    instance = webpage
    webpage = undefined
    user = undefined
  }
  //console.log([webpage, user, instance])
  
  let tags = []
  
  let domainTag
  
  if (webpage !== undefined) {
    tags.push('Webpage_' + webpage.primaryKeyValue)
    domainTag = 'Domain_' + webpage.domain_id
  }
  else if (typeof(instance.webpage_id) === 'number') {
    tags.push('Webpage_' + instance.webpage_id)
    if (typeof(instance.domain_id) === 'number') {
      domainTag = 'Domain_' + instance.domain_id
    }
  }
  
  if (user !== undefined) {
    tags.push('User_' + user.primaryKeyValue)
    if (!domainTag) {
      domainTag = 'Domain_' + user.domain_id
    }
  }
  else if (typeof(instance.user_id) === 'number') {
    tags.push('User_' + instance.user_id)
    if (!domainTag && typeof(instance.domain_id) === 'number') {
      domainTag = 'Domain_' + instance.domain_id
    }
  }
  
  let className = instance.constructor.name
  if (className === 'Function'
          && typeof(instance.name) === 'string') {
    className = instance.name
  }
  tags.push(className)
  
  if (domainTag) {
    tags.unshift(domainTag)
  }
  
  console.log(tags)
  
  return tags
}

module.exports = Cache