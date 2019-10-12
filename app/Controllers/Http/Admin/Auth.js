'use strict'

const User = use('App/Models/User')
const UserOAuth = use('App/Models/UserOAuth')

const Hash = use('Hash')
const OriginFilter = use('App/Helpers/OriginFilter')

class Auth {
  async test ({request, params}) {
    return request.all()
  }
  
  async ok () {
    return false
  }
  
  async list ({ request, auth }) {
    let {origin} = request.get()
    if (typeof(origin) !== 'string') {
      return []
    }
    else {
      origin = OriginFilter(origin)
    }
    //console.log(origin)
    
    let users = await User
            .query()
            .where('origin', origin)
            .fetch()
    
    return users.toJSON()
  }
}

module.exports = Auth
