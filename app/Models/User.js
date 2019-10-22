'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
//const Model = use('App/Models/CustomizedModel/CustomizedModel')
const Model = use('Model')

const AvatarHelper = use('App/Helpers/AvatarHelper')

const Cache = use('Cache')

class User extends Model {
  
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.username.indexOf(' ') > -1) {
        throw `Username cannot contain space. (${userInstance.username})`
      }
      
      //if (userInstance.dirty.password) {
      //  userInstance.password = await Hash.make(userInstance.password)
      //}
      
      if (typeof(userInstance.display_name) !== 'string' 
              || userInstance.display_name === '') {
        userInstance.display_name = userInstance.username
      }
      
      if (typeof(userInstance.avatar) !== 'string') {
        userInstance.avatar = AvatarHelper.getRandomUser()
      }
      //console.log('user', userInstance.avatar)
    })
    
  }
  
  static async findByNameInWebpage (webpage, username) {
    let users = await User
            .query()
            .where('domain_id', webpage.domain_id)
            .where('username', username)
            .pick(1)
    
    if (users.size() > 0) {
      return users.first()
    }
  }
  
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
  
  readingProgresses (webpage, step) {
    let relation = this.hasMany('App/Models/ReadingProgress')
      .orderBy('step', 'asc')
    if (typeof(webpage) === 'object' 
            && typeof(webpage.primaryKeyValue) === 'number') {
      relation.where('webpage_id', webpage.primaryKeyValue)
    }
    if (typeof(step) === 'number') {
      relation.where('step', step)
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
  
  async getOtherUserIDsInGroup(webpage) {
    let cacheKey = `User.getOtherUserIDsInGroup.${webpage.primaryKeyValue}`
    return await Cache.get(cacheKey, async () => {
      /*
      let groups = await this.manyThrough('App/Models/WebpageGroup', 'users')
              .where('webpage_id', webpage.primaryKeyValue)
              .with('users', (builder) => {
                builder.where('users.id', '<>', this.primaryKeyValue)
              })
              .fetch()
      */
      let groups = await this.group()
              .where('webpage_id', webpage.primaryKeyValue)
              .with('users', (builder) => {
                builder.whereNot('users.id', this.primaryKeyValue)
              })
              .pick(1)

      let userIds
      if (groups.size() > 0) {
        //console.log(groups.first())
        userIds = groups.first().toJSON().users.map(user => user.id)
      }
      else {
        // 查詢沒有加入群組的使用者
        userIds = await webpage.getAnonymousUserIDs(this)
      }

      await Cache.forever(cacheKey, userIds)
      return userIds
    })
  }
  
  static get computed () {
    return ['avatar_url']
  }

  getAvatarUrl ({avatar}) {
    return AvatarHelper.userURL(avatar)
  }
  
  // ---------------
  
  annotations () {
    return this.hasMany('App/Models/Annotation')
  }
  
  sectionAnnotations () {
    return this.hasMany('App/Models/SectionAnnotation')
  }
  
  // ----------------
  
  notifications () {
    return this.hasMany('App/Models/UserNotification')
  }
}

module.exports = User
