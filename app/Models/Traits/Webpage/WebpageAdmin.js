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
      let cacheKey = Cache.key('getAdminIDs', this)
      return await Cache.rememberWait([this, 'Webpage'], cacheKey, async () => {
        return UserModel
              .query()
              .where('domain_id', this.domain_id)
              .whereIn('role', ['global_admin', 'domain_admin'])
              .pluck('id')
      })
      
    }

  } // register (Model) {
}

module.exports = WebpageAdmin
