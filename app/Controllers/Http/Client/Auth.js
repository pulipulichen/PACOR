'use strict'

const Log = use('App/Models/Domain')

const User = use('App/Models/User')
const Domain = use('App/Models/Domain')

const Env = use('Env')
const ADMIN_USERNAME = Env.get('ADMIN_USERNAME')
const ADMIN_PASSWORD = Env.get('ADMIN_PASSWORD')

const AvatarHelper = use('App/Helpers/AvatarHelper')

const { HttpException } = use('@adonisjs/generic-exceptions') 

const ADMIN_ROLES = [
  'global_admin',
  'domain_admin'
]

class Auth {
  async login ({ request, auth, webpage }) {
    throw new HttpException('test')
    
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
      user = user.toJSON()[0]
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
  
  async logout ({ auth }) {
    try {
      await auth.logout()
      //let user = await auth.getUser()
      //console.log(user.username)
      return 1
    }
    catch (error) {
      return error
    }
  }
  
  async _forceLogout(auth) {
    try {
      await auth.check()
      await auth.logout()
    } catch (error) {}
  }
  
  async _getLoginedUserData (webpage, user) {
    let readingProgresses = await user.getReadingProgresses(webpage)
    return {
      username: user.username,
      displayName: user.display_name,
      avatar: user.avatarURL,
      readingProgresses: readingProgresses
    }
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
