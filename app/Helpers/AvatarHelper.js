'use strict'

const Config = use('Config')
const {admin, guest, users} = Config.get('avatar')

const Env = use('Env')
const baseURL = `${Env.get('PROTOCOL')}//${Env.get('HOST')}:${Env.get('PORT')}/avatars/`

let AvatarHelper = {
  /*
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
   */
  getRandomUser: function (index) {
    
    if (typeof(index) === 'number') {
      index = users.length % index
      return users[index].name
    }

    let userIndex = Math.floor(Math.random() * users.length)
    return users[userIndex].name
  },
  
  adminURL: function () {
    return baseURL + admin
  },
  
  guestURL: function () {
    return baseURL + guest
  },
  
  userURL: function (name) {
    if (name === null) {
      return
    }
    let file = users[name]
    return baseURL + file
  },
}

module.exports = AvatarHelper