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
    let user
    try {
      user = await auth.getUser()
      let role = user.role
      isAdmin = (ADMIN_ROLES.indexOf(role) > -1)
      isGlobalAdmin = (role === 'global_admin')
    }
    catch (e) {}
    auth.isAdmin = isAdmin
    auth.isGlobalAdmin = isGlobalAdmin
    
    auth.checkAdmin = (domainID) => {
      if (isGlobalAdmin === true) {
        return true
      }
      else if (isAdmin === false) {
        throw new HttpException(`You don't have permisssion to access.`, 403)
      }
      else if (domainID !== undefined) {
        if (typeof(domainID) === 'string') {
          domainID = parseInt(domainID, 10)
        }
        return user.domain_id === domainID
      }
    }
    
    auth.checkGlobalAdmin = () => {
      if (isGlobalAdmin === false) {
        throw new HttpException(`You don't have permisssion to access.`, 403)
      }
    }
    
    auth.checkDomainAdmin = function (domainID) {
      return this.checkAdmin(domainID)
    }
    
    await next()
  }
}

module.exports = AuthAdminCheck
