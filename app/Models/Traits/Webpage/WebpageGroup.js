'use strict'

const Cache = use('Cache')
const User = use('App/Models/User')

const WebpageGroupModel = use('App/Models/WebpageGroup')

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
            if (user !== '') {
              lineArray.push(user)
            }
          })
          list.push(lineArray)
        })
      }
      
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

    Model.prototype.getUsersNotInGroup = async function () {
      let idsList = await this.getUserIDsNotInGroup()
      let readers = await User
              .query()
              .whereIn('id', idsList)
              .fetch()
      return readers
    }

    Model.prototype.getUserIDsNotInGroup = async function () {
      let cacheKey = `getUserIDsNotInGroup`
      
      return await Cache.rememberWait([this], cacheKey, async () => {
        let relation = User
                .query()
                .where('role', 'reader')
                .where('domain_id', this.domain_id)

        let groups = await this.groups().fetch()
        let usersInGroups = []
        groups.toJSON().forEach(group => {
          group.users.forEach(user => {
            usersInGroups.push(user.id)
          })
        })

        if (usersInGroups.length > 0) {
          relation.whereNotIn('id', usersInGroups)
        }

        let users = await relation.fetch()
        let output = []
        if (users !== null) {
          output = users.toJSON().map(user => user.id)
        }
        
        let adminIDs = await this.getAdminIDs()
        output = output.concat(adminIDs)
        
        return output
      })
    }
    
  } // register (Model) {
}

module.exports = WebpageGroup
