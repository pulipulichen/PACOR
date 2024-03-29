'use strict'

const User = use('App/Models/User')
const Domain = use('App/Models/Domain')

const Env = use('Env')
const Cache = use('Cache')
const ADMIN_USERNAME = Env.get('ADMIN_USERNAME')
const ADMIN_PASSWORD = Env.get('ADMIN_PASSWORD')

const AvatarHelper = use('App/Helpers/AvatarHelper')

const ADMIN_ROLES = [
  'global_admin',
  'domain_admin'
]

const Config = use('Config')
let flushCache = Config.get('reading.debug.flushCache') // for test

class Auth {
  async login ({ request, auth }) {
    const {domain, username, password} = request.get()
    
    // -------------------------
    // 先檢查是否是全網站的admin
    if (username === ADMIN_USERNAME 
            && password === ADMIN_PASSWORD
            && domain === '') {
      return this._loginGlobalAdmin({ request, auth })
    }
    else {
      return this._loginDomainAdmin({ request, auth })
    }
  }
  
  async logout ({ auth }) {
    try {
      await auth.logout()
      return 1
    }
    catch (error) {
      return 0
    }
  }
  
  async _forceLogout(auth) {
    try {
      await auth.check()
      await auth.logout()
    } catch (error) {}
  }
  
  async _loginGlobalAdmin({ request, auth }) {
    // 先檢查是否有這個user
    let user
    user = await User
      .query()
      .where('username', ADMIN_USERNAME)
      .where('role', 'global_admin')
      .whereHas('domain', (builder) => {
        builder.where('domain', '')
      })
      .pick(1)
    
    if (user.size() > 0) {
      user = user.toJSON()[0]
      await this._forceLogout(auth)
      await auth.loginViaId(user.id)
      return {
        displayName: user.display_name,
        avatar: AvatarHelper.adminURL(),
        domainID: user.domain_id,
        role: user.role
      }
    }
    
    let domain = await Domain.findOrCreate({
      domain: ''
    })
    
    user = new User()
    user.username = ADMIN_USERNAME
    user.role = 'global_admin'
    user.avatar = 'admin'
    
    await domain.users().save(user)
    
    
    await this._forceLogout(auth)
    await auth.remember(true).login(user)
    return {
      displayName: ADMIN_USERNAME,
      avatar: AvatarHelper.adminURL(),
      domainID: user.domain_id,
      role: user.role
    }
  }
  
  async _loginDomainAdmin({ request, auth}) {
    const {username, password, domain} = request.get()
    
    let user
    user = await User
      .query()
      .where('username', username)
      .where('password', password)
      .where('role', 'domain_admin')
      .whereHas('domain', (builder) => {
        builder.where('domain', domain)
      })
      .fetch()
    
    if (user.size() === 0) {
      throw 'No user'
    }
    else {
      user = user.first()
    }
    
    //let match = await user.validatePassword(password)
    //if (match === false) {
    //  return 0
    //}
    
    await this._forceLogout(auth)
    await auth.remember(true).login(user)
    return {
      displayName: user.name,
      avatar: AvatarHelper.userURL(user.avatar),
      domainID: user.domain_id,
      role: user.role
    }
  }
  
  // -----------------------------
  
  async checkLogin ({auth}) {
    
    if (flushCache === true) {
      await Cache.forgetWithTags()
    }
    
    try {
      let user = await auth.getUser()
      let role = user.role
      if (ADMIN_ROLES.indexOf(role) > -1) {
        let avatarURL
        if (role === 'global_admin') {
          avatarURL = AvatarHelper.adminURL()
        }
        else {
          avatarURL = AvatarHelper.userURL(user.avatar)
        }
        
        await Cache.flush()
        
        return {
          username: user.username,
          displayName: user.display_name,
          avatar: avatarURL,
          domainID: user.domain_id,
          role: user.role
        }
      }
      else {
        await this._forceLogout(auth)
        return 0
      }
    }
    catch (error) {
      return 0
    }
  }
}

module.exports = Auth
