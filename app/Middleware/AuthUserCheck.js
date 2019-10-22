'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 

class AuthUserCheck {
  async handle (data, next) {
    let auth = data.auth
    try {
      data.user = await auth.getUser()
    } catch (e) {
      throw new HttpException('Please login', 403)
    }
    await next()
  }
}

module.exports = AuthUserCheck