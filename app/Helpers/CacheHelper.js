'use strict'

const Config = use('Config')
const exec = use('child_process').exec

/**
 * https://www.npmjs.com/package/adonis-cache
 * 
 * 刪除的做法
 * await Cache.tags([this, 'User']).flush()
 */
const Cache = use('Adonis/Addons/Cache')

const ExceptionHelper = use('App/Helpers/ExceptionHelper')

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
Cache.rememberWaitLocksMS = 3000

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

    let hasKey = await cacheQuery.has(cacheKey)
    if (hasKey === true) {
      let result = await cacheQuery.get(cacheKey)
      resolve(result)
      return true
    }

    // ------------------------------------------
    let lockName = buildLockName(tags, cacheKey)
    
    if (typeof(this.rememberWaitLocks[lockName]) === 'boolean' 
            && this.rememberWaitLocks[lockName] === true) {
      // 被鎖定了
      console.log('LOCKED: ', lockName)
      setTimeout(async () => {
        this.rememberWaitLocks[lockName] = false
        //console.log('UNLOCKED: ', lockName)
        //console.log('再次嘗試')
        //let result = await this.rememberWait(tags, cacheKey, minutes, callback)
        let result = await cacheQuery.remember(cacheKey, minutes, callback)
        //hasKey = await cacheQuery.has(cacheKey)
        //console.log('hasKey', hasKey)
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
    
    //delete this.rememberWaitLocks[lockName]
    this.rememberWaitLocks[lockName] = false
    //console.log(this.rememberWaitLocks)
    resolve(result)
    return true
  })  // return new Promise((resolve, reject) => {
}

Cache.rememberInstant = function (tags, cacheKey, minutes, callback) {
  
  if (typeof(callback) !== 'function' 
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

    // ------------------------------
    // 如果沒有被鎖定的話
    let result = await cacheQuery.remember(cacheKey, minutes, callback)
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
    try {
      let result = await cacheQuery.rememberForever(cacheKey, callback)
      delete this.rememberWaitLocks[lockName]
      //console.log(this.rememberWaitLocks)
      resolve(result)
      return true
    }
    catch (e) {
      console.error('[CacheHelper error] ' 
              + JSON.stringify(tags) 
              + ' ' + cacheKey + '\n' 
              + e)
      throw e
    }
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
  
  if (Array.isArray(tags) === false) {
    tags = [tags]
  }
  
  output = tags.reduce((o, tag) => {
    //console.log(tag.constructor.name, typeof(tag) === 'object', typeof(tag.primaryKeyValue))
    if (typeof(tag) === 'object') {
      if (!domainTag && typeof(tag.domain_id) === 'number') {
        domainTag = 'Domain_' + tag.domain_id
      }
      if (typeof(tag.primaryKeyValue) === 'number') {
        let name = tag.constructor.name
        let nameWithID = tag.constructor.name + '_' + tag.primaryKeyValue
        //o.push(name, nameWithID)
        
        // 是不是tag太多引起的恐慌啊？少一點tag好了...
        o.push(nameWithID)
        
        //return tag.constructor.name + '_' + tag.primaryKeyValue
      }
    }
    else if (typeof(tag) === 'function') {
      o.push(tag.name)
    }
    else {
      //return tag
      o.push(tag)
    }
    return o
  }, [])
  
  if (domainTag) {
    output.unshift(domainTag)
  }
  
  return output
}

Cache.filterTags = filterTags

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
  
  //console.log(tags)
  
  return tags
}

// ------------------------

Cache.forgetWithTags = async function (tags, cacheKey) {
  
  if (typeof(tags) === 'string'
            && typeof(cacheKey) === 'undefined') {
    cacheKey = tags
    tags = null
  }
  
  if (tags !== null && tags !== undefined && Array.isArray(tags) === false) {
    tags = [tags]
  }
  if (Array.isArray(tags)) {
    tags = filterTags(tags)
  }
  
  // ---------------
  
  let cacheQuery
  
  if (Array.isArray(tags)) {
    cacheQuery = Cache.tags(tags)
  }
  else {
    cacheQuery = Cache
  }
  
  this.rememberWaitLocks = {}
  
  if (typeof(cacheKey) === 'string') {
    await cacheQuery.forget(cacheKey)
  }
  else {
    await cacheQuery.flush()
    /*
    try {
      await cacheQuery.flush()
    }
    catch (e) {
      console.log(e.message, (e.message === `READONLY You can't write against a read only slave.`))
      if (e.message === `READONLY You can't write against a read only slave.`) {
        // 重新啟動REDIS
        //let command = `net stop Redis && net start Redis`
        let command = `powershell -command "Restart-Service Redis -Force"`
        //
        //let command2 = `net start Redis`
        exec(command, async function (error, stdout, stderr) {
          console.log(error)
          //exec(command2, async function (error, stdout, stderr) {
            await Cache.forgetWithTags(tags, cacheKey) 
          //})
        });
      }
      else {
        throw e
      }
    }
     */
  }
}

Cache.foreverWithTags = function (tags, cacheKey, value) {
  tags = filterTags(tags)
  return Cache.tags(tags).forever(cacheKey, value)
}

Cache.rememberForeverWithTags = function (tags, cacheKey, callback) {
  tags = filterTags(tags)
  return Cache.tags(tags).rememberForever(cacheKey, callback)
}

Cache.getWithTags = function (tags, cacheKey, defaultValue) {
  tags = filterTags(tags)
  return Cache.tags(tags).get(cacheKey, defaultValue)
}

module.exports = Cache