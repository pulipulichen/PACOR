'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 

class AuthUserCheck {
  async handle (data, next) {
    let auth = data.auth
    data.user = await auth.getUser()
    await next()
  }
}

module.exports = AuthUserCheck
