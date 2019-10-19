'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const UserModel = use('App/Models/User')

const Config = use('Config')

const { HttpException } = use('@adonisjs/generic-exceptions') 

class Dashboard {
  async info ({request, auth}) {
    let {webpageID} = request.all()
    
    let webpage = await WebpageModel
            .query()
            .with('domain')
            .where('id', webpageID)
            .pick(1)
    
    webpage = webpage.first().toJSON()
    
    await auth.checkDomainAdmin(webpage.domain_id)
    
    let webpageURL = webpage.domain.domain + webpage.path
    return {
      webpageURL
    }
  }
  
  async groups ({request, auth}) {
    let {webpageID} = request.all()
    
    let webpage = await WebpageModel
            .query()
            .with('groups')
            .where('id', webpageID)
            .pick(1)
    
    webpage = webpage.first().toJSON()
    
    await auth.checkDomainAdmin(webpage.domain_id)
    
    return {
      groups: webpage.groups
    }
  }
  
  async t () {
    let webpage = await WebpageModel.find(1)
    console.log(webpage.primaryKey, webpage.primaryKeyValue)
    return DomainModel
            .query()
            .with('w', webpage)
            .where('id', 2)
            .fetch()
  }
}

module.exports = Dashboard
