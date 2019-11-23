'use strict'

const Cache = use('Cache')

class UserGroup {

  register(Model) {

    /**
     * 取得使用者群組裡面的使用者
     * 
     * @param {Webpage} webpage
     * @returns {Array|Integer}
     */
    Model.prototype.getUsersInGroup = async function (webpage, includeAdmins) {
      let cacheKey = Cache.key(`User.getUsersInGroup`, webpage, includeAdmins)
      
      // 先調查這個階段是否開放合作
      let isEnableCollaboration = await this.isEnableCollaboration(webpage)
      //console.log({isEnableCollaboration})
      if (isEnableCollaboration === false) {
        return [this]
      }
        
      return await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        
        /*
         let groups = await this.manyThrough('App/Models/WebpageGroup', 'users')
         .where('webpage_id', webpage.primaryKeyValue)
         .with('users', (builder) => {
         builder.where('users.id', '<>', this.primaryKeyValue)
         })
         .fetch()
         */
        let groups = await this.group()
                .where('webpage_id', webpage.primaryKeyValue)
                .with('users')
                .fetch()

        let users = []
        if (groups.size() > 0) {
          //console.log(groups.first())
          groups.toJSON().map(group => {
            group.users.map(user => {
              users.push(user)
            })
          })
        } else {
          // 查詢沒有加入群組的使用者
          users = await webpage.getUsersNotInGroup()
        }
        
        if (includeAdmins === true) {
          let admins = await webpage.getAdmins()
          //console.log(admins)
          if (admins !== null) {
            admins = admins.toJSON()
            users = users.concat(admins)
          }
        }

        //await Cache.forever(cacheKey, userIds)
        return users
      })  // return await Cache.get(cacheKey, async () => {
    }

    /**
     * 取得使用者群組裡面的使用者ID
     * 
     * @param {Webpage} webpage
     * @returns {Array|Integer}
     */
    Model.prototype.getUserIDsInGroup = async function (webpage, includeAdmins) {
      let users = await this.getUsersInGroup(webpage, includeAdmins)
      
      return users.map(user => user.id)
    }

    Model.prototype.getOtherUserIDsInGroup = async function (webpage) {
      let userIds = await this.getUserIDsInGroup(webpage)
      return userIds.filter(id => id !== this.primaryKeyValue)
    }
  } // register (Model) {
}

module.exports = UserGroup
