'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

class UserCheckEnableCollaboration {
  async handle (data, next) {
    
    let enable = data.user.isEnableCollaboration(data.webpage)
    if (enable === false) {
      throw new HttpException('You cannot interact with others in current step.', 403)
    }
    
    await next()
  }
}

module.exports = UserCheckEnableCollaboration
