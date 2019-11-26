'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

class AuthUserCheck {
  async handle (data, next) {
    let auth = data.auth
    try {
      //console.log('我的嗎？')
      let user = await auth.getUser()
      //console.log('AuthUserCheck 1', user.username)
      data.user = await UserModel.find(user.primaryKeyValue)
      //console.log('AuthUserCheck 2', data.user.username)
      //data.user.isAdmin = data.webpage.isAdmin(user)
    } catch (e) {
      throw new HttpException('Please login', 403)
    }
    await next()
  }
}

module.exports = AuthUserCheck
