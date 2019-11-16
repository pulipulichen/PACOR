'use strict'

const User = use('App/Models/User')
const Webpage = use('App/Models/Webpage')

class UserFind {

  register(Model) {
    
    Model.findByNameInWebpage = async function (webpage, username) {
      let users = await User
              .query()
              .where('domain_id', webpage.domain_id)
              .where('username', username)
              .pick(1)

      if (users.size() > 0) {
        return users.first()
      }
    }
    
    Model.findByNameInURL = async function (url, username) {
      let webpage = await Webpage.findByURL(url)
      
      let users = await User
              .query()
              .where('domain_id', webpage.domain_id)
              .where('username', username)
              .pick(1)

      if (users.size() > 0) {
        return users.first()
      }
    }
    
  } // register (Model) {
}

module.exports = UserFind
