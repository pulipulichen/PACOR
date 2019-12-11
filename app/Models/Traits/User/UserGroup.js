'use strict'

const Cache = use('Cache')
const TypeHelper = use('App/Helpers/TypeHelper')

const Profiler = use('Profiler')

class UserGroup {

  register(Model) {

    /**
     * 取得使用者群組裡面的使用者
     * 
     * @param {Webpage} webpage
     * @returns {Array|Integer}
     */
    Model.prototype.getUsersInGroup = async function (webpage, includeAdmins) {
      let profiler = new Profiler(1, 'User/UserGroup.getUsersInGroup()', includeAdmins)
      
      //let cacheKey = Cache.key(`User.getUsersInGroup`, includeAdmins)
      
      // 先調查這個階段是否開放合作
      profiler.before('this.isEnableCollaboration()')
      
      let isEnableCollaboration = await this.isEnableCollaboration(webpage)
      
      profiler.after('this.isEnableCollaboration()', isEnableCollaboration)
      
      //console.log({isEnableCollaboration})
      if (isEnableCollaboration === false) {
        profiler.finish()
        return [this]
      }
      
      profiler.after('this.isEnableCollaboration()')
        
      //let output = await Cache.rememberWait([webpage, this], cacheKey, async () => {
        
        /*
         let groups = await this.manyThrough('App/Models/WebpageGroup', 'users')
         .where('webpage_id', webpage.primaryKeyValue)
         .with('users', (builder) => {
         builder.where('users.id', '<>', this.primaryKeyValue)
         })
         .fetch()
         */
        
        profiler.before('fetch groups')
        
        let groups = await this.group()
                .where('webpage_id', webpage.primaryKeyValue)
                .with('users')
                .fetch()

        profiler.after('fetch groups')

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
          
          profiler.before('webpage.getUsersNotInGroup()')
          
          users = await webpage.getUsersNotInGroup()
          users = users.toJSON()
          
          profiler.after('webpage.getUsersNotInGroup()')
        }
        
        profiler.after('filter users')
        
        if (includeAdmins === true) {
          profiler.before('await webpage.getAdmins()')
          let admins = await webpage.getAdmins()
          profiler.after('await webpage.getAdmins()')
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
        
        profiler.after('if (includeAdmins === true) {')

        profiler.finish()

        //await Cache.forever(cacheKey, userIds)
        return users
      //})  // return await Cache.get(cacheKey, async () => {
      
     //profiler.finish()
      
      //return output
    }

    /**
     * 取得使用者群組裡面的使用者ID
     * 
     * @param {Webpage} webpage
     * @returns {Array|Integer}
     */
    Model.prototype.getUserIDsInGroup = async function (webpage, includeAdmins) {
      
      let profiler = new Profiler(0, 'User/UserGroup.getUserIDsInGroup()', includeAdmins)
      
      let cacheKey = Cache.key(`User.getUserIDsInGroup`, includeAdmins)
      
      // 先調查這個階段是否開放合作
      profiler.before('this.isEnableCollaboration()')
      
      let isEnableCollaboration = await this.isEnableCollaboration(webpage)
      
      profiler.after('this.isEnableCollaboration()', isEnableCollaboration)
      
      //console.log({isEnableCollaboration})
      if (isEnableCollaboration === false) {
        profiler.finish()
        return [this.primaryKeyValue]
      }
      
      profiler.after('this.isEnableCollaboration()')
        
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        
        /*
         let groups = await this.manyThrough('App/Models/WebpageGroup', 'users')
         .where('webpage_id', webpage.primaryKeyValue)
         .with('users', (builder) => {
         builder.where('users.id', '<>', this.primaryKeyValue)
         })
         .fetch()
         */
        
        profiler.before('fetch groups')
        
        let groups = await this.group()
                .where('webpage_id', webpage.primaryKeyValue)
                .with('users', (builder) => {
                    builder.select('id')
                })
                .fetch()

        profiler.after('fetch groups')

        let users = []
        if (groups.size() > 0) {
          //console.log(groups.first())
          //console.log('User.getUsersInGroup', '有群組')
          groups.toJSON().map(group => {
            group.users.map(user => {
              users.push(user.id)
            })
          })
        } else {
          // 查詢沒有加入群組的使用者
          //console.log('User.getUsersInGroup', '查詢沒有加入群組的使用者')
          
          profiler.before('webpage.getUserIDsNotInGroup()')
          
          users = await webpage.getUserIDsNotInGroup()
          //users = users.toJSON()
          
          profiler.after('webpage.getUserIDsNotInGroup()')
        }
        
        profiler.after('filter users')
        
        if (includeAdmins === true) {
          profiler.before('await webpage.getAdmins()')
          let admins = await webpage.getAdminIDs()
          profiler.after('await webpage.getAdmins()')
          //console.log(admins)
          if (admins !== null) {
            //admins = admins.toJSON()
            if (Array.isArray(users) === false) {
              users = []
            }
            users = users.concat(admins)
          }
        }
        
        profiler.after('if (includeAdmins === true) {')

        profiler.finish()

        //await Cache.forever(cacheKey, userIds)
        return users
      })  // return await Cache.get(cacheKey, async () => {
      
      profiler.finish()
      
      return output
    }

    Model.prototype.getOtherUserIDsInGroup = async function (webpage) {
      let userIds = await this.getUserIDsInGroup(webpage)
      return userIds.filter(id => id !== this.primaryKeyValue)
    }
    
    Model.prototype.isUserInMyGroup = async function (webpage, focusUserID) {
      if (!focusUserID || this.isAdmin()) {
        return true
      }
      
      let isInAnonymousGroup = await this.isInAnonymousGroup(webpage)
      
      if (isInAnonymousGroup === false) {
        let ids = await this.getOtherUserIDsInGroup(webpage)
        focusUserID = TypeHelper.parseInt(focusUserID)
        return (ids.indexOf(focusUserID) > -1)
      }
      else {
        let userIdList = await webpage.getUserIDsInGroups()
        if (userIdList === null) {
          return true
        }
        return (userIdList.indexOf(focusUserID) === -1)
      }
    }
    
    Model.prototype.isInAnonymousGroup = async function (webpage) {
      let cacheKey = Cache.key('isInAnonymousGroup')
      return await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let groups = await this.group()
                  .where('webpage_id', webpage.primaryKeyValue)
                  .select('id')
                  .fetch()

        return (groups.size() === 0)
      })
    }
    
  } // register (Model) {
}

module.exports = UserGroup
