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
    Model.prototype.getUserIDsInGroup = async function (webpage) {
      let cacheKey = Cache.key(`User.getUserIDsInGroup`, webpage)
      
      // 先調查這個階段是否開放合作
      let isEnableCollaboration = await this.isEnableCollaboration(webpage)
      //console.log({isEnableCollaboration})
      if (isEnableCollaboration === false) {
        return [this.primaryKeyValue]
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

        let userIds = []
        if (groups.size() > 0) {
          //console.log(groups.first())
          groups.toJSON().map(group => {
            group.users.map(user => {
              userIds.push(user.id)
            })
          })
        } else {
          // 查詢沒有加入群組的使用者
          userIds = await webpage.getReaderIDsNotInGroup()
        }
        
        let adminIds = await webpage.getAdminIDs()
        //console.log(adminIds)
        userIds = userIds.concat(adminIds)

        //await Cache.forever(cacheKey, userIds)
        return userIds
      })  // return await Cache.get(cacheKey, async () => {
    }

    Model.prototype.getOtherUserIDsInGroup = async function (webpage) {
      let userIds = await this.getUserIDsInGroup(webpage)
      return userIds.filter(id => id !== this.primaryKeyValue)
    }
  } // register (Model) {
}

module.exports = UserGroup
