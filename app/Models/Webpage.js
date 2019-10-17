'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const CrawlerHelper = use('App/Helpers/CrawlerHelper')
const Env = use('Env')
const baseURL = `${Env.get('PROTOCOL')}//${Env.get('HOST')}:${Env.get('PORT')}`

class Webpage extends Model {
  
  static boot () {
    super.boot()

    this.addHook('afterCreate', async (instance) => {
      instance._crawlTitleFromURL(instance)
    })
  }
  
  async _crawlTitleFromURL (instance) {
    if (typeof(instance.title) === 'string' 
            && instance.title !== '') {
      return
    }

    //instance.title = await 
    let domain = await instance.domain().fetch
    if (typeof(domain.domain) === 'string' 
            && domain.domain !== '') {
      domain = domain.domain
    }
    else {
      domain = baseURL
    }
    let url = domain + instance.path

    instance.title = await CrawlerHelper.getTitle(url)
    //console.log(instance.title)
    instance.save()
  }
  
  domain () {
    return this.belongsTo('App/Models/Domain')
  }
  
  annotations () {
    return this.hasMany('App/Models/Annotation')
  }
  
  groups () {
    return this.hasMany('App/Models/WebpageGroup')
            .with('users')
            .orderBy('group_seq_id', 'asc')
  }
  
  async getGroupsList() {
    let groups = await this.groups().fetch()
    
    let list = groups.toJSON().map(group => {
      return group.users.map(user => user.username).join(' ')
    })
    
    return list.join('\n')
  }
  
  async setGroupsList(list) {
    if (typeof(list) === 'string') {
      let lines = list.trim().split('\n')
      list = []
      lines.forEach(line => {
        let lineArray = []
        line.trim().split(' ').forEach(user => {
          if (user !== '') {
            lineArray.push(user)
          }
        })
        list.push(lineArray)
      })
    }
    
    
  }
}

module.exports = Webpage
