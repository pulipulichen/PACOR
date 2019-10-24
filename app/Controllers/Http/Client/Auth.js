'use strict'

const User = use('App/Models/User')

const { HttpException } = use('@adonisjs/generic-exceptions') 

const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

/**
 * 登入
 */
class Auth {
  async login ({ request, auth, webpage }) {
    const {username, password} = request.all()
    
    let role = 'reader'
    if (typeof(password) === 'string' && password !== '') {
      role = 'domain_admin'
    }
    
    let query = User
            .query()
            .where('domain_id', webpage.domain_id)
            .where('username', username)
            .where('role', role)
    
    if (role === 'domain_admin') {
      query.where('password', password)
    }
    
    let user = await query.pick(1)
    if (user.size() > 0) {
      //user = user.toJSON()[0]
      user = user.first()
      await this._forceLogout(auth)
      await auth.loginViaId(user.id)
      let data = await this._getLoginedUserData(webpage, user)
      return data
    }
    else if (role === 'domain_admin') {
      throw new HttpException('Login fail')
    }
    
    // 不然就建立新的使用者
    let newUser = await this._createUser(username, webpage)
    await this._forceLogout(auth)
    await auth.loginViaId(newUser.id)
    let data = await this._getLoginedUserData(webpage, newUser)
    return data
  }
  
  async _createUser (username, webpage) {
    let user = new User
    
    user.username = username
    user.domain_id = webpage.domain_id
    
    await user.save()
    return user
  }
  
  async logout ({ auth, webpage }) {
    let output = 1
    let user
    try {
      user = await auth.getUser()
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
    let config = await webpage.getConfig()
    await user.startReadingProgress(webpage)
    let readingProgresses = await user.getReadingProgressStatus(webpage)
    let data = {
      username: user.username,
      displayName: user.display_name,
      avatar: user.avatarURL,
      readingProgresses: readingProgresses,
      readingProgressesFinish: config.readingProgressesFinish
    }
    await ReadingActivityLog.log(webpage, user, 'Auth.login', data)
    return data
  }
  
  // -----------------------------
  
  async checkLogin ({auth, webpage}) {
    
    try {
      let user = await auth.getUser()
      
      if (webpage.domain_id !== user.domain_id) {
        await this._forceLogout(auth)
        return 0
      }
      
      let data = await this._getLoginedUserData(webpage, user)
      return data
    }
    catch (error) {
      return 0
    }
  }
}

module.exports = Auth
