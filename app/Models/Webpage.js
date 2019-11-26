/* global use */

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

//const Env = use('Env')
//const baseURL = `${Env.get('PROTOCOL')}//${Env.get('HOST')}:${Env.get('PORT')}`


//const WebpageGroup = use('App/Models/WebpageGroup')
//const User = use('App/Models/User')

//const { HttpException } = use('@adonisjs/generic-exceptions') 

const Cache = use('Cache')


class Webpage extends Model {
  
  static boot () {
    super.boot()

    //this.addHook('afterCreate', async (instance) => {
    //  instance._crawlTitleFromURL(instance)
    //})
    
    this.addHook('beforeSave', async (instance) => {
      await Cache.forget(Cache.key('Webpage', 'getReadingProgresses', instance))
      await Cache.forget(Cache.key('Models.Webpage.getAgreement', this))
      await Cache.forget(Cache.key('Models.Webpage.getConfig', this))
      await Cache.forget(Cache.key('Models.Webpage.getStepConfig', this))
    })
    
    this.addTrait('JSONCase', 'config')
    
    this.addTrait('Webpage/WebpageGroup')
    this.addTrait('Webpage/WebpageConfig')
    this.addTrait('Webpage/WebpageFind')
    this.addTrait('Webpage/WebpageCrawler')
    this.addTrait('Webpage/WebpageAdmin')
    this.addTrait('Webpage/WebpageAnnotation')
    this.addTrait('Webpage/WebpageLog')
    this.addTrait('Webpage/WebpageNotification')
  }
  
  
  domain () {
    return this.belongsTo('App/Models/Domain')
  }
  
  annotations () {
    return this.hasMany('App/Models/Annotation')
  }
  
  groups (group_seq_id) {
    let groups = this.hasMany('App/Models/WebpageGroup')
            .with('users')
            .orderBy('group_seq_id', 'asc')
    
    if (typeof(group_seq_id) === 'number') {
      groups.where('group_seq_id', group_seq_id)
              .limit(1)
    }
    
    return groups
  }
  
  
  static get hidden () {
    //return ['password']
    return ['created_at', 'updated_at'
      , 'title', 'config', 'agreement'
    ]
  }
  
  // ------------------
  
  annotations () {
    return this.hasMany('App/Models/Annotation')
  }
  
  //admins () {
  //  return this.hasMany('App/Models/User')
  //          .whereIn('role', ['global_admin', 'domain_admin'])
  //}
  
//  sectionAnnotations() {
//    return this.hasMany('App/Models/SectionAnnotation')
//  }
  
  isAdmin (user) {
    return (user.role === 'global_admin'
            || (user.role === 'domain_admin' && user.webpage_id === this.primaryKeyValue))
  }
}

module.exports = Webpage
