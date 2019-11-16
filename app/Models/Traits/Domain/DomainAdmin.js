'use strict'

const Cache = use('Cache')
//const UserModel = use('App/Models/User')

//const WebpageGroupModel = use('App/Models/WebpageGroup')

class DomainAdmin {

  register(Model) {

    /**
     * 
     * @param {Array} adminsArray
     * [{
     *  username: 'name1',
     *  password: 'passowrd'
     * }]
     * @returns {Number}
     */
    Model.prototype.changeAdmins = async function (adminsArray) {
      if (typeof(adminsArray) === 'string') {
        adminsArray = adminsArray.split(' ').map(config => {
          let parts = config.split(':')
          
          if (config.indexOf(':') === -1 || !parts[1] || parts[1].length === 0) {
            throw new Error('Admin need password')
          }
          return {
            username: parts[0],
            password: parts[1]
          }
        })
      }
      
      
      if (Array.isArray(adminsArray) === false) {
        throw new Error('adminsArray should be array')
      }
      
      let adminsUsername = adminsArray.map(admin => admin.username)
      let adminPasswordMapping = {}
      adminsArray.forEach(admin => {
        adminPasswordMapping[admin.username] = admin.password
      })

      // 先把不是名單中的人變成讀者
      await this.admins()
              .whereNotIn('username', adminsUsername)
              .update({'role': 'reader'})

      await this.readers()
              .whereIn('username', adminsUsername)
              .update({'role': 'domain_admin'})

      let users = await this.users()
              .whereIn('username', adminsUsername)
              .fetch()

      let admins = await this.admins().fetch()
      for (let i in admins.rows) {
        let admin = admins.rows[i]
        admin.password = adminPasswordMapping[admin.username]
        await admin.save()
      }

      let existedUsernames = users.toJSON().map(user => user.username)
      let nonexistentUsernams = adminsUsername.filter(username => existedUsernames.indexOf(username) === -1)

      let usersData = nonexistentUsernams.map((username, i) => {
        return {
          username: username,
          password: adminsArray[i].password,
          role: 'domain_admin'
        }
      })

      await this.users().createMany(usersData)

      // 移除快取
      await Cache.tags('Domain_' + this.primaryKeyValue).flush()

      return 1
    }

  } // register (Model) {
}

module.exports = DomainAdmin
