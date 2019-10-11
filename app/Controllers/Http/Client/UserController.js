'use strict'

const User = use('App/Models/User')
const UserOAuth = use('App/Models/UserOAuth')

const Hash = use('Hash')

class UserController {
  async login ({ request, auth, origin }) {
    const query = request.get()
    
    await this._forceLogout(auth)
    return await this._attempLogin(auth, query, origin)
  }
  
  async _attempLogin(auth, query, origin) {
    let user = await User.findBy({
      username: query.username,
      origin: origin
    })
    
    if (user === null) {
      return {error: 'no-user'}
    }
    
    let match = await user.validatePassword(query.password)
    if (match === false) {
      return {error: 'password-wrong'}
    }
    
    await this._forceLogout(auth)
    await auth.remember(true).login(user)
    return {}
  }
  
  async register({ request, response, view, session, auth, origin }) {
    const query = request.get()

    let user = await User.findBy({
      username: query.username,
      origin: origin
    })
    
    if (user === null) {
      // 走註冊，建立使用者
      user = new User()

      user.username = query.username
      user.email = query.email
      user.password = query.password
      user.origin = origin

      let result = await user.save()
      if (result === true) {
        await this._forceLogout(auth)
        await auth.remember(true).login(user)
        return {}
      } else {
        return {
          error: 'add-user-failed'
        }
      }
    }

    // --------------
    // 走登入
    return await this._attempLogin(auth, query, origin)
  }
  
  async _forceLogout(auth) {
    try {
      await auth.check()
      await auth.logout()
    } catch (error) {}
  }
  
  async logout ({ auth }) {
    try {
      await auth.logout()
      return true
    }
    catch (error) {
      return {error}
    }
  }
  
  async checkLogin ({auth, origin}) {
    try {
      let user = await auth.getUser()
      if (user.origin === origin) {
        return user.username
      }
      else {
        await this._forceLogout(auth)
        return false
      }
    }
    catch (error) {
      return false
    }
  }
  
  async attemptLoginViaUsername ({auth, request, origin}) {
    const query = request.get()
    
    let user = await User.findBy({
      username: query.username,
      origin: origin
    })
    
    if (user === null) {
      return {error: 'no-user'}
    }
    
    await this._forceLogout(auth)
    await auth.remember(true).login(user)
    return user.username
  }
  
  async oauthRequest({ally, params}) {
    await ally.driver(params.driver).stateless().redirect()
  }
  
  async oauthAuthenticated({ally, params}) {
    let driver = params.driver
    let oauthUser = await ally.driver(driver).getUser()
    oauthUser = oauthUser.toJSON()
    
    return `<script>
      window.opener.postMessage({
        oauthUser: ${JSON.stringify(oauthUser)}
      }, '*')
    </script>`
  }
  
  async oauthLogin({request, auth, origin}) {
    
    let {driver, oauthUser} = request.get()
    oauthUser = JSON.parse(oauthUser)
    let oauthID = oauthUser.id
    
    // ----------------------------
    
    let user, userOauth
    userOauth = await UserOAuth
      .query()
      .where('driver', driver)
      .where('oauth_id', oauthID)
      .whereHas('user', (builder) => {
        builder.where('origin', origin)
      })
      .fetch()
    
    if (userOauth.size() > 0) {
      user = await User.find(userOauth.first().user_id)
      await auth.remember(true).login(user)
      return user.username
    }
    
    // -------------------------
    // 嘗試用email合併既有的帳號
    
    let email = oauthUser.email
    if (typeof(email) === 'string') {
      user = await User.findBy({
        email: email,
        origin: origin
      })

      if (user !== null) {
        userOauth = new UserOAuth()
        
        userOauth.driver = driver
        userOauth.oauth_id = oauthID
        
        await user.oauths().save(userOauth)
        await auth.remember(true).login(user)
        return user.username
      }
    }
    else {
      email = oauthID + '@' + driver + '.oauth'
    }
    
    // -------------------------
    // 在這裡建立user並且嘗試登入
    user = new User()

    user.username = oauthUser.name
    if (typeof(oauthUser.nickname) === 'string') {
      user.username = oauthUser.nickname
    }
    user.username = user.username + '@' + driver
    user.email = email 
    user.origin = origin

    await user.save()
    
    userOauth = new UserOAuth()
        
    userOauth.driver = driver
    userOauth.oauth_id = oauthID

    await user.oauths().save(userOauth)
    
    await this._forceLogout(auth)
    await auth.remember(true).login(user)
    return user.username
  }
}

module.exports = UserController
