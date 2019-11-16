'use strict'

const Cache = use('Cache')
const UserModel = use('App/Models/User')

//const WebpageGroupModel = use('App/Models/WebpageGroup')

class WebpageAdmin {

  register(Model) {

    Model.prototype.getAdmins = async function () {
      return UserModel
              .query()
              .where('domain_id', this.domain_id)
              .whereIn('role', ['global_admin', 'domain_admin'])
              .fetch()
    }
    
    Model.prototype.getAdminIDs = async function () {
      let cacheKey = Cache.key('Webpage', 'getAdminIDs', this)
      return await Cache.rememberWait([this, 'Webpage'], cacheKey, async () => {
        //console.log('getAdminIDs', 1)
        let admins = await this.getAdmins()
        //console.log('getAdminIDs', 2)
        
        return admins.toJSON().map(user => user.id)
      })
      
    }

  } // register (Model) {
}

module.exports = WebpageAdmin
