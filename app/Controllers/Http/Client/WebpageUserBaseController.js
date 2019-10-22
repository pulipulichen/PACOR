'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')
const Cache = use('Cache')
const Config = use('Config')

/**
 * For example: Annotation
 */
class WebpageUserBaseController {
  constructor (modelName) {
    if (typeof(modelName) !== 'string') {
      modelName = 'Annotation'
    }
    this.modelName = modelName
  }
  
  setModel (model) {
    this.modelName = model
  }
  
  get model () {
    //console.log('App/Models/' + this.modelName)
    return use('App/Models/' + this.modelName)
  }
  
  get hasDeletedColumn () {
    return true
  }
  
  async indexMy ({ request, webpage, user }) {
    let condition = request.all()
    await ReadingActivityLog.log(webpage, user, this.modelName + '.indexMy', condition)
    
    let cacheKey = `${this.modelName}.indexMy.${webpage.id}.${user.id}.${JSON.stringify(condition)}`
    return await Cache.get(cacheKey, async () => {
      let query = this.model
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)

      if (this.hasDeletedColumn === true) {
        query.where('deleted', false)
      }

      if (typeof(condition) === 'object') {
        query.where(condition)
      }

      let output = await query.fetch()
      await Cache.put(cacheKey, output, Config.get('view.indexCacheMinute'))
      return output
    })
  }
  
  async indexOthers ({ request, webpage, user }) {
    let condition = request.all()
    await ReadingActivityLog.log(webpage, user, this.modelName + '.indexOthers', condition)
    
    let cacheKey = `${this.modelName}.indexOthers.${webpage.id}.${user.id}.${JSON.stringify(condition)}`
    return await Cache.get(cacheKey, async () => {
      let others = await user.getOtherUsersInGroup(webpage)

      let query = this.model
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .whereIn('user_id', others)

      if (this.hasDeletedColumn === true) {
        query.where('deleted', false)
      }

      if (typeof(condition) === 'object') {
        query.where(condition)
      }

      let output = await query.fetch()
      await Cache.put(cacheKey, output, Config.get('view.indexCacheMinute'))
      return output
    })
  }
  
  async create({request, webpage, user}) {
    let id = -1
    let data = request.all()
    
    await ReadingActivityLog.log(webpage, user, this.modelName + '.create', data)
    
    if (this.hasDeletedColumn === false) {
      let instance = new this.model

      instance.webpage_id = webpage.primaryKeyValue
      instance.user_id = user.primaryKeyValue
      for (let name in data) {
        instance[name] = data[name]
      }

      await instance.save()
      id = instance.id
    }
    else {
      let condition = {
        webpage_id: webpage.primaryKeyValue,
        user_id: user.primaryKeyValue,
      }
      
      for (let name in data) {
        condition[name] = data[name]
      }
      
      let instance = await this.model.findOrCreate(condition)
      
      if (instance.deleted === true) {
        instance.deleted = false
        await instance.save()
        id = instance.id
      }
    }
    return id
  }
  
  async update ({request, webpage, user}) {
    let data = request.all()
    
    await ReadingActivityLog.log(webpage, user, this.modelName + '.update', data)
    
    let id = data.id
    if (typeof(id) !== 'number') {
      throw new HttpException('No id')
    }
    
    let instance = await this.model.find(id)
    if (instance.user_id !== user.id) {
      throw new HttpException('You are not owner of it.')
    }
    
    for (let name in data) {
      if (name === 'id') {
        continue
      }
      else {
        instance[name] = data[name]
      }
    }
    
    await instance.save()
    return 1
  }
  
  async destroy({request, webpage, user}) {
    let data = request.all()
    
    await ReadingActivityLog.log(webpage, user, this.modelName + '.destroy', data)
    
    let id = data.id
    if (typeof(id) !== 'number') {
      throw new HttpException('No id')
    }
    
    let instance = await this.model.find(id)
    if (instance.user_id !== user.id) {
      throw new HttpException('You are not owner of it.')
    }
    
    if (typeof(instance.deleted) === 'boolean'
            && instance.deleted === false) {
      instance.deleted = true
      await instance.save()
    }
    else {
      await instance.delete()
    }
    return 1
  }
}

module.exports = WebpageUserBaseController
