'use strict'

const User = use('App/Models/User')

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
  } // register (Model) {
}

module.exports = UserFind
