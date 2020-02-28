'use strict'

const Cache = use('Cache')
const User = use('App/Models/User')

const WebpageGroupModel = use('App/Models/WebpageGroup')
const ReadingProgressModel = use('App/Models/ReadingProgress')

const Profiler = use('Profiler')

class WebpageGroup {

  register(Model) {

//  getGroups(group_seq_id) {
//    return this.groups(group_seq_id)
//  }

    Model.prototype.getGroup = async function (group_seq_id) {
      let group = await this.groups(group_seq_id).fetch()
      //console.log(group_seq_id, group.toJSON())
      if (group === null) {
        return null
      }
      return group.first()
    }

    Model.prototype.getOrderedGroupInstances = async function () {
      let groups = await this.groups()
              .fetch()

      let mapping = {}
      groups.rows.forEach(group => {
        mapping[group.group_seq_id] = group
      })
      return mapping
    }

    Model.prototype.getGroupsList = async function () {
      let cacheKey = 'getGroupsList'
      return await Cache.rememberWait([this], cacheKey, async () => {
        let groups = await this.groups().fetch()

        let list = groups.toJSON().map(group => {
          return group.users.map(user => user.username).join(' ')
        })

        let output = list.join('\n')
        //await Cache.forever(cacheKey, output)
        return output
      })
    }

    Model.prototype.setGroupsList = async function (list) {
      
      if (typeof (list) === 'string') {
        let lines = list.trim().split('\n')
        list = []
        lines.forEach(line => {
          let lineArray = []
          line.trim().split(' ').forEach(user => {
            //console.log(`*${user}*`)
            if (user.trim() !== '') {
              lineArray.push(user.trim())
            }
          })
          list.push(lineArray)
        })
      }
      
      //console.log('setGroupsList', list)
      //console.log('setGroupsList', 2)

      // ---------------------

      let currentSeqID
      let groups = await this.getOrderedGroupInstances()
      for (currentSeqID = 0; currentSeqID < list.length; currentSeqID++) {
        let group = groups[currentSeqID]

        if (group === null || group === undefined) {
          group = new WebpageGroupModel()
          //group.webpage_id = this.primaryKeyValue
          group.group_seq_id = currentSeqID

          //console.log('setGroupsList', 2.1)
          await this.groups().save(group)
          //await group.save()
          //console.log('setGroupsList', 2.2)
        }

        // ----------------------

        let usersToAdd = list[currentSeqID]
        
        await group.setUsers(usersToAdd)

        // ----------------------

        delete groups[currentSeqID]
      } // for (currentSeqID = 0; currentSeqID < list.length; currentSeqID++) {

      //console.log('setGroupsList', 3)

      for (let i in groups) {
        await groups[i].users().detach()
        await groups[i].delete()
      } // for (let i in groups) {
      
      //console.log('setGroupsList', 4)
      
      await Cache.forgetWithTags([this])

//      await Cache.forget(`User.getUsersInGroup.${this.primaryKeyValue}`)
//
//      await Cache.forget(`Webpage.getUsersNotInGroup.${this.primaryKeyValue}`)
//      await Cache.forget(`Webpage.getUserIDsNotInGroup.${this.primaryKeyValue}`)
//      await Cache.forget(`Webpage.getGroupsList.${this.primaryKeyValue}`)

      //console.log('setGroupsList', 5)
    } // Model.prototype.setGroupsList = async function (list) {

    

    // ------------------

    Model.prototype.getUsersNotInGroup = async function (onlyActive) {
      let idsList = await this.getUserIDsNotInGroup(onlyActive)
      
      let readers = await User
              .query()
              .with('latestLog')
              .whereIn('id', idsList)
              .orderBy('created_at', 'desc')
              .fetch()
      
      //console.log(typeof(readers.toJSON().slice(-1)[0].latestLog[0].created_at_unixms))
      return readers
    }
    
    Model.prototype.getUserIDsInGroups = async function () {
      let cacheKey = Cache.keys(`Webpage.getUserIDsInGroups`)
      
      return await Cache.rememberWait([this, 'Webpage'], cacheKey, async () => {
        let groups = await this.groups().fetch()
        let usersInGroups = []
        groups.toJSON().forEach(group => {
          group.users.forEach(user => {
            usersInGroups.push(user.id)
          })
        })
        return usersInGroups
      })
    }
    
    Model.prototype.getUserIDsNotInGroup = async function (onlyActive) {
      let profiler = new Profiler(1, 'Webpage/WebpageGroup.getUserIDsNotInGroup() ' + onlyActive)
      
      let cacheKey = Cache.keys(`Webpage.getUserIDsNotInGroup`, onlyActive)
      
      profiler.before('Cache.rememberWait')
      
      let doQuery = async () => {
        
        profiler.before('relation')
        
        let relation = User
                .query()
                .where('role', 'reader')
                .where('domain_id', this.domain_id)
                .select('id')

        profiler.before('getUserIDsInGroups()')

        let usersInGroups = await this.getUserIDsInGroups()

        if (usersInGroups.length > 0) {
          relation.whereNotIn('id', usersInGroups)
        }
        
        if (onlyActive === true) {
          relation.whereHas('readingProgresses', (builder) => {
            builder.where('webpage_id', this.primaryKeyValue)
          })
        }

        profiler.before('fetch')

        let users = await relation.fetch()
        
        profiler.after('fetch')
        
        let output = []
        if (users !== null) {
          output = users.toJSON().map(user => user.id)
        }
        
        profiler.before('getAdminIDs()')
        
        let adminIDs = await this.getAdminIDs()
        output = output.concat(adminIDs)
        
        return output
      }
      
      //let output = await Cache.rememberWait([this, 'Webpage'], cacheKey, doQuery)
      let output = await doQuery()  // 先不使用快取看看
      
      profiler.finish()
      return output
    }
    
    Model.prototype.getActiveUsersCount = async function () {
      let cacheKey = Cache.key(`Wepbage.getActiveUsersCount`)
      return await Cache.rememberWait(['Webpage', this], cacheKey, 3, async () => {
        let count = await ReadingProgressModel
                .query()
                .where('webpage_id', this.primaryKeyValue)
                .whereHas('user', (builder) => {
                  builder.where('role', 'reader')
                })
                .countDistinct('user_id')

        const total = parseInt(count[0]['count'], 10)
        //console.log(count)
        return total
      })
    }
    
    Model.parseUsersGroupsCount = async function (webpagesInstance, webpage) {

      //let webpage = webpagesInstance.toJSON()
      let groups = []
      let usersCount = 0
      //console.log(webpage.groups)
      if (Array.isArray(webpage.groups) === false) {
        throw new Error(`You need query Webpage with('groups')`)
      }
      
      webpage.groups.forEach(group => {
        if (group.users.length > 0) {
          let g = group.users.map(user => user.username).filter(username => (username !== '') )
          groups.push(g.join(' '))
          usersCount = usersCount + g.length
        }
      })
      webpage.groupsCount = groups.length
      webpage.usersCount = usersCount
      webpage.groups = groups.join('\n')
      webpage.activeUsersCount = await webpagesInstance.getActiveUsersCount() 
      
    }
    
  } // register (Model) {
}

module.exports = WebpageGroup
