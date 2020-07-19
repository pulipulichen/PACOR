'use strict'

const ADMIN_ROLES = [
  'global_admin',
  'domain_admin',
]

const { HttpException } = use('@adonisjs/generic-exceptions') 
const WebpageModel = use('App/Models/Webpage')

let AuthHelper = {
  chackAdmin: async function (auth) {
    let user = await auth.getUser()
    let role = user.role
    if (ADMIN_ROLES.indexOf(role) === -1) {
      throw new HttpException(`You don't have permisssion to access.`, 403)
    }
  },
  checkDomainAdmin: async function (auth, webpageID) {
    let webpage = await WebpageModel
              .query()
              .where('id', webpageID)
              .pick(1)
    webpage = webpage.first()
    await auth.checkDomainAdmin(webpage.domain_id)
    return webpage
  }
}

module.exports = AuthHelper