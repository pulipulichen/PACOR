'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 

// MyAnnotation base
class WebpageUserBaseController {
  model () {
    return use('App/Models/Annotation')
  }
  
  get hasDeletedColumn () {
    return true
  }
  
  async index ({ request, webpage, user }) {
    let query = this.model
            .where('webpage_id', webpage.primaryKeyValue)
            .where('user_id', user.primaryKeyValue)
    
    if (this.hasDeletedColumn === true) {
      query.where('deleted', false)
    }
    
    let condition = request.all()
    if (typeof(condition) === 'object') {
      query.where(condition)
    }
    
    return await query.fetch()
  }
  
  async create({request, webpage, user}) {
    let data = request.all()
    if (this.hasDeletedColumn === false) {
      let instance = new this.model

      instance.webpage_id = webpage.primaryKeyValue
      instance.user_id = user.primaryKeyValue
      for (let name in data) {
        instance[name] = data[name]
      }

      await instance.save()
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
      }
    }
    return 1
  }
  
  async update ({request, webpage, user}) {
    let data = request.all()
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
