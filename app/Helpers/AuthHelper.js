'use strict'

const ADMIN_ROLES = [
  'global_admin',
  'domain_admin',
]

const { HttpException } = use('@adonisjs/generic-exceptions') 

let AuthHelper = {
  chackAdmin: async function (auth) {
    let user = await auth.getUser()
    let role = user.role
    if (ADMIN_ROLES.indexOf(role) === -1) {
      throw new HttpException(`You don't have permisssion to access.`, 403)
    }
  }
}

module.exports = AuthHelper