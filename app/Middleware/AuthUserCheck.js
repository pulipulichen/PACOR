'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

class AuthUserCheck {
  async handle (data, next) {
    let auth = data.auth
    try {
      //console.log('我的嗎？')
      let user = await auth.getUser()
      data.user = await UserModel.find(user.primaryKeyValue)
      //data.user.isAdmin = data.webpage.isAdmin(user)
    } catch (e) {
      throw new HttpException('Please login', 403)
    }
    await next()
  }
}

module.exports = AuthUserCheck
