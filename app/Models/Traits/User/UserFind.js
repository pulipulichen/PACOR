'use strict'

const User = use('App/Models/User')
const Webpage = use('App/Models/Webpage')

const Env = use('Env')
const Domain = use('App/Models/Domain')

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
    } // Model.findByNameInURL = async function (url, username) {
    
    Model.findGlobalAdmin = async function () {
      
      const ADMIN_USERNAME = Env.get('ADMIN_USERNAME')
      const ADMIN_PASSWORD = Env.get('ADMIN_PASSWORD')
      
      let admins = await User
        .query()
        .where('username', ADMIN_USERNAME)
        .where('role', 'global_admin')
        .whereHas('domain', (builder) => {
          builder.where('domain', '')
        })
        .pick(1)

      if (admins !== null && admins.size() === 1) {
        //console.log(admins.toJSON())
        return admins.first()
      }
      
      let admin = new User()
      admin.username = ADMIN_USERNAME
      admin.role = 'global_admin'
      admin.avatar = 'admin'

      let domain = await Domain.findOrCreate({
        domain: ''
      })
      await domain.users().save(admin)
      
      return admin
    }
    
  } // register (Model) {
}

module.exports = UserFind
