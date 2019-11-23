'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
//const Model = use('App/Models/CustomizedModel/CustomizedModel')
const Model = use('Model')

const AvatarHelper = use('App/Helpers/AvatarHelper')
const Config = use('Config')

/**
table.integer('domain_id').notNullable().unsigned().references('id').inTable('domains').onDelete('cascade')
table.string('username', 80).notNullable()
table.string('email', 254)
table.string('password', 60)
table.string('role', 60).notNullable().defaultTo('reader')
table.string('display_name', 20)
table.string('avatar', 254)
 */
class User extends Model {
  
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (instance) => {
      if (instance.username.indexOf(' ') > -1) {
        throw `Username cannot contain space. (${instance.username})`
      }
      
      //if (userInstance.dirty.password) {
      //  userInstance.password = await Hash.make(userInstance.password)
      //}
      
      if (typeof(instance.display_name) !== 'string' 
              || instance.display_name === '') {
        instance.display_name = instance.username
      }
    })
    
    this.addHook('afterSave', async (instance) => {
      if (typeof(instance.avatar) !== 'string') {
        instance.avatar = AvatarHelper.getRandomUser(instance.primaryKeyValue)
        await instance.save()
      }
    })
    
    this.addTrait('JSONCase', 'preference')
    //console.log('user', userInstance.avatar)
      
    this.addTrait('User/UserConfig')
    this.addTrait('User/UserReadingProgressConfig')
    this.addTrait('User/UserReadingProgressAction')
    this.addTrait('User/UserGroup')
    this.addTrait('User/UserFind')
    //this.addTrait('User/UserNotification')
    this.addTrait('User/UserSection')
  } // static boot () {
  
  async validatePassword (queryPassword) {
    if (typeof(queryPassword) !== 'string') {
      return false
    } 
    let userPassword = this.password
    const isSame = await Hash.verify(queryPassword, userPassword)
    return isSame
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
  
  messages () {
    return this.hasMany('App/Models/Message')
  }
  
  oauths () {
    return this.hasMany('App/Models/UserOAuth')
  }
  
  domain () {
    return this.belongsTo('App/Models/Domain')
  }
  
  readingProgresses (webpage, stepName) {
    let relation = this.hasMany('App/Models/ReadingProgress')
    if (typeof(webpage) === 'object' 
            && typeof(webpage.primaryKeyValue) === 'number') {
      relation.where('webpage_id', webpage.primaryKeyValue)
    }
    if (typeof(stepName) === 'string') {
      relation.where('step_name', stepName)
    }
    return relation
  }
  
  static get hidden () {
    //return ['password']
    return ['created_at', 'updated_at']
  }
  
  groups (groupID) {
    let groups = this.belongsToMany('App/Models/WebpageGroup')
            .pivotTable('group_user')
    if (typeof(groupID) === 'number') {
      groups.where('id', groupID)
    }
    return groups
  }
  
  /**
   * .with('group', 'webpage_id', webpage)
   */
  group () {
    let group = this.belongsToMany('App/Models/WebpageGroup')
            .pivotTable('group_user')
    return group
  }
  
  
  static get computed () {
    return ['avatar_url']
  }

  getAvatarUrl ({avatar}) {
    return AvatarHelper.userURL(avatar)
  }
  
  // ---------------
  
  annotations (webpage) {
    let query = this.hasMany('App/Models/Annotation')
    
    if (webpage) {
      query.where('webpage_id', webpage.primaryKeyValue)
    }
    
    return query
  }
  
  annotationTypes () {
    let query = this.hasMany('App/Models/Annotation')
    
    return query
  }
  
//  sectionAnnotations () {
//    return this.hasMany('App/Models/SectionAnnotation')
//  }
  
  // ----------------
  
  notifications () {
    return this.hasMany('App/Models/UserNotification')
  }
  
  getPreference (preference) {
    let basePreference = Config.get('userPreference')
    
    if (preference !== null
            && typeof(preference) === 'object') {
      for (let key in preference) {
        basePreference[key] = preference[key]
      }
    }
    
    return basePreference
  }
}

module.exports = User
