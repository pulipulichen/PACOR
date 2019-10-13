'use strict'

const Config = use('Config')
const {admin, guest, users} = Config.get('avatar')

const Helpers = use('Helpers')

let AvatarHelper = {
  getRandomUser: function (excludedUsers) {
    if (Array.isArray(excludedUsers) === false) {
      excludedUsers = []
    }
    
    let usersArray = []
    for (let name in users) {
      if (excludedUsers.length > 0 
              && excludedUsers.indexOf(name) > -1) {
        continue
      }
      
      usersArray.push({
        name: name,
        //file: users[name]
      })
    }

    if (usersArray.length === 0) {
      return this.getRandomUser()
    }

    let userIndex = Math.floor(Math.random() * usersArray.length)
    return usersArray[userIndex].name
  },
  
  adminURL: function () {
    return Helpers.publicPath(`avators/${admin}`)
  },
  
  guestURL: function () {
    return Helpers.publicPath(`avators/${guest}`)
  },
  
  userURL: function (name) {
    let file = users[name]
    return Helpers.publicPath(`avators/${file}`)
  },
}

module.exports = AvatarHelper