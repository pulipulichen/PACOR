'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
//const Model = use('App/Models/CustomizedModel/CustomizedModel')
const Model = use('Model')

const AvatarHelper = use('App/Helpers/AvatarHelper')
const ReadingProgress = use('App/Models/ReadingProgress')

const Cache = use('Cache')

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
  
  async getCurrentReadingProgressStepName (webpage) {
    let status = await this.getReadingProgressStatus(webpage)
    if (status.length === 0) {
      return null
    }
    //let stepName = status[0].step_name
    for (let i = 0; i < status.length; i++) {
      let step = status[i]
      if (step.isCompleted === true) {
        continue
      }
      
      if (typeof(step.start_timestamp) === 'number'
              && typeof(step.end_timestamp) !== 'number') {
        //console.log('step.step_name', step.step_name)
        return step.step_name
      }
      
      if (typeof(step.start_timestamp) !== 'number') {
        //console.log('step.step_name', step.step_name)
        return step.step_name
      }
      /*
      if (typeof(step.start_timestamp) === 'number'
              && typeof(step.end_timestamp) !== 'number') {
        return step.step_name
      }
      */
    }
    //console.log('null')
    return null
  }
  
  async getReadingProgressStatus (webpage) {
    let cacheKey = Cache.key('User', 'getReadingProgressStatus', webpage, this)
    return await Cache.get(cacheKey, async () => {
      let readingProgresses
      if (Array.isArray(webpage) === false
              && typeof(webpage.primaryKeyValue) === 'number') {
        readingProgresses = await webpage.getReadingProgresses()
      }
      let status = await this.readingProgresses(webpage).fetch()
      status = status.toJSON()
      //console.log(status)
      readingProgresses = readingProgresses.map(stepName => {
        let output = {
          'step_name': stepName
        }

        for (let i in status) {
          let s = status[i]
          if (s.step_name === stepName) {
            output.start_timestamp = s.start_timestamp
            output.end_timestamp = s.end_timestamp
            output.duration = s.duration
            output.isCompleted = s.isCompleted
          }
        }

        return output
      })
      Cache.forever(cacheKey, readingProgresses)
      return readingProgresses
    })
  }
  
  async startReadingProgress (webpage, stepName) {
    let time = (new Date()).getTime()
    if (typeof(stepName) !== 'string') {
      stepName = await this.getCurrentReadingProgressStepName(webpage)
    }
    if (stepName === null) {
      return null
    }
    //console.log('startReadingProgress', stepName)
    let step = await ReadingProgress.findOrCreate({
      'user_id': this.primaryKeyValue,
      'webpage_id': webpage.primaryKeyValue,
      'step_name': stepName
    }, {
      'user_id': this.primaryKeyValue,
      'webpage_id': webpage.primaryKeyValue,
      'step_name': stepName,
      'start_timestamp': time
    })
    if (step.start_timestamp === time) {
      // 表示這是新增的資料
      await Cache.forget(Cache.key('User', 'getReadingProgressStatus', webpage, this))
    }
    //console.log('startReadingProgress AAA', step.start_timestamp)
    console.log('startReadingProgress', step.toJSON())
    return step
  }
  
  async endReadingProgress (webpage, stepName) {
    let time = (new Date()).getTime()
    
    let step
    if (typeof(stepName) === 'string') {
      step = await this.readingProgresses(webpage, stepName).fetch()
    }
    else {
      //console.log('AAAA')
      step = await this.startReadingProgress(webpage)
      if (step === null) {
        return null
      }
    }
    
    //console.log(step.toJSON())
    
    if (typeof(step.end_timestamp) !== 'number') {
      if (typeof(step.start_timestamp) !== 'number') {
        step.start_timestamp = time
      }
      step.end_timestamp = time
      //console.log('step.end_timestamp AAA', time)
      await step.save()
      //console.log('step.end_timestamp BBB', time)
      Cache.forget(Cache.key('User', 'getReadingProgressStatus', webpage, this))
      //console.log('step.end_timestamp CCC', time)
    }
    
    return step
  }
  
  async addActivitySeconds (webpage, seconds) {
    //console.log('addActivitySeconds', seconds, typeof(seconds))
    if (isNaN(seconds) === false) {
      seconds = parseInt(seconds, 10)
    }
    if (typeof(seconds) !== 'number') {
      return false
    }
    
    let step = await this.startReadingProgress(webpage)
    //console.log(activity_seconds)
    if (step === null) {
      return null
    }
    
    //console.log(step.activity_seconds, typeof(step.activity_seconds))
    if (isNaN(step.activity_seconds) === false) {
      step.activity_seconds = parseInt(step.activity_seconds, 10)
    }
    if (typeof(step.activity_seconds) !== 'number') {
      step.activity_seconds = 0
    }
    step.activity_seconds = step.activity_seconds + seconds
    await step.save()
    return step
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
