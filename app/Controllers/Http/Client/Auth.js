'use strict'

const User = use('App/Models/User')

const { HttpException } = use('@adonisjs/generic-exceptions') 

const ReadingActivityLog = use ('App/Models/ReadingActivityLog')
const Cache = use('Cache')

let flushCache = true // for test

/**
 * 登入
 */
class Auth {
  async login ({ request, auth, webpage }) {
    const {username, password} = request.all()
    
    let role = 'reader'
    
    if (typeof(password) === 'string' 
            && password !== '') {
      role = 'domain_admin'
    }
    
    let query = User
            .query()
            .where('domain_id', webpage.domain_id)
            .where('username', username)
            //.where('role', role)
    if (role === 'domain_admin') {
      query.where('password', password)
    }
    
    //console.log({username, password, role})
    //console.log(query.toSQL())
    
    let user = await query.pick(1)
    //console.log(user.size())
    
    if (user.size() > 0) {
      //user = user.toJSON()[0]
      user = user.first()
      if (user.role !== role) {
        throw new HttpException('Login fail')
      }
      
      await this._forceLogout(auth)
      //console.log('login', user.primaryKeyValue)
      await auth.loginViaId(user.primaryKeyValue)
      //console.log(user)
      let data = await this._getLoginedUserData(webpage, user)
      
      webpage.log(user, 'Auth.login', data)
    
      return data
    }
    else if (role === 'domain_admin') {
      throw new HttpException('Login fail')
    }
    
    // --------------------------
    let config = await webpage.getConfig()
    if (config.login.allowLoginWithoutGrop === false) {
      throw new HttpException('Login fail')
    }
    
    // 不然就建立新的使用者
    let newUser = await this._createUser(username, webpage)
    await this._forceLogout(auth)
    await auth.loginViaId(newUser.id)
    let data = await this._getLoginedUserData(webpage, newUser)
    webpage.log(newUser, 'Auth.login', data)
    return data
  }
  
  async _createUser (username, webpage) {
    let user = new User
    
    user.username = username
    user.domain_id = webpage.domain_id
    user.role = 'reader'
    
    await user.save()
    
    //console.log('_createUser', user.toJSON().avatar_url)
    return user
  }
  
  async logout ({ auth, webpage }) {
    let output = 1
    let user
    try {
      user = await auth.getUser()
      webpage.log(user, 'Auth.logout')
      await auth.logout()
      //let user = await auth.getUser()
      //console.log(user.username)
    }
    catch (error) {
      output = error
    }
    
    if (typeof(user) === 'object') {
      await ReadingActivityLog.log(webpage, user, 'Auth.logout', output)
    }
    
    return output
  }
  
  async _forceLogout(auth) {
    try {
      await auth.check()
      await auth.logout()
    } catch (error) {}
  }
  
  async _getLoginedUserData (webpage, user) {
    //let config = await webpage.getConfig()
    //console.log(1, typeof(user.constuctor.name))
    await user.startReadingProgress(webpage)
    //console.log(2)
    let readingProgresses = await user.getReadingProgressStatus(webpage)
    let userJSON = user.toJSON()
    
    let sessionToken = Math.floor((new Date()).getTime() / 1000).toString(36)
    
    //let notificationUnreadCount = await user.getNotificationUnreadCount(webpage)
    //notificationUnreadCount = 20  // for test 20191122
    
    //console.log(userJSON)
    //console.log(user.preference)
    let data = {
      userID: user.id,
      username: user.username,
      displayName: user.display_name,
      avatar: userJSON.avatar_url,
      role: user.role,
      readingProgresses: readingProgresses,
      //readingProgressesFinish: config.readingProgressesFinish,
      //readingConfig: config,
      preference: userJSON.preference,
      sessionToken
      //notificationUnreadCount: notificationUnreadCount
    }
    //console.log(data)
    await ReadingActivityLog.log(webpage, user, 'Auth.login', data)
    return data
  }
  
  // -----------------------------
  
  async checkLogin ({auth, webpage}) {
    //throw new Error('錯誤')
    
    if (flushCache === true) {
      await Cache.forgetWithTags()
    }
    
    let config = await webpage.getConfig()
    
    try {
      let user = await auth.getUser()
      if (webpage.domain_id !== user.domain_id) {
        await this._forceLogout(auth)
        return 0
      }
      //console.log(4, user.id)
      let status = await this._getLoginedUserData(webpage, user)
      status.readingConfig = config
      
      return {
        status,
        needLogin: false
      }
    }
    catch (error) {
      //throw new HttpException(error)
      return {
        status: {
          readingConfig: config,
        },
        needLogin: true
      }
    }
  }
}

module.exports = Auth
