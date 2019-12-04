'use strict'

const Cache = use('Cache')
const TypeHelper = use('App/Helpers/TypeHelper')

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
          //console.log('User.getUsersInGroup', '有群組')
          groups.toJSON().map(group => {
            group.users.map(user => {
              users.push(user)
            })
          })
        } else {
          // 查詢沒有加入群組的使用者
          //console.log('User.getUsersInGroup', '查詢沒有加入群組的使用者')
          users = await webpage.getUsersNotInGroup()
          users = users.toJSON()
        }
        
        if (includeAdmins === true) {
          let admins = await webpage.getAdmins()
          //console.log(admins)
          if (admins !== null) {
            admins = admins.toJSON()
            if (typeof(users.toJSON) === 'function') { 
              users = users.toJSON()
            }
            else if (Array.isArray(users) === false) {
              users = []
            }
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
    
    Model.prototype.isUserInMyGroup = async function (webpage, focusUserID) {
      if (!focusUserID) {
        return true
      }
      
      let ids = await this.getOtherUserIDsInGroup(webpage)
      focusUserID = TypeHelper.parseInt(focusUserID)
      return (ids.indexOf(focusUserID) > -1)
    }
    
    Model.prototype.isInAnonymousGroup = async function (webpage) {
      let groups = await this.group()
                .where('webpage_id', webpage.primaryKeyValue)
                .fetch()
        
      return (groups.size() === 0)
    }
    
  } // register (Model) {
}

module.exports = UserGroup
