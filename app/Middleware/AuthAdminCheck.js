'use strict'

const ADMIN_ROLES = [
  'global_admin',
  'domain_admin',
]

const { HttpException } = use('@adonisjs/generic-exceptions') 

class AuthAdminCheck {
  async handle (data, next) {
    let auth = data.auth
    let isAdmin = false
    let isGlobalAdmin = false
    try {
      let user = await auth.getUser()
      let role = user.role
      isAdmin = (ADMIN_ROLES.indexOf(role) > -1)
      isGlobalAdmin = (role === 'global_admin')
    }
    catch (e) {}
    auth.isAdmin = isAdmin
    auth.isGlobalAdmin = isGlobalAdmin
    
    auth.checkAdmin = () => {
      if (isAdmin === false) {
        throw new HttpException(`You don't have permisssion to access.`, 403)
      }
    }
    
    auth.checkGlobalAdmin = () => {
      if (isGlobalAdmin === false) {
        throw new HttpException(`You don't have permisssion to access.`, 403)
      }
    }
    
    await next()
  }
}

module.exports = AuthAdminCheck
