'use strict'

const Cache = use('Cache')
const User = use('App/Models/User')

class WebpageGroup {

  register(Model) {

//  getGroups(group_seq_id) {
//    return this.groups(group_seq_id)
//  }

    Model.prototype.getGroup = async function (group_seq_id) {
      let group = await this.groups(group_seq_id).fetch()
      if (group === null) {
        return null
      }
      return group.first()
    }

    Model.prototype.getGroups = async function () {
      let groups = await this.groups()
              .fetch()

      let mapping = {}
      groups.rows.forEach(group => {
        mapping[group.group_seq_id] = group
      })
      return mapping
    }

    Model.prototype.getGroupsList = async function () {
      let cacheKey = `Webpage.getGroupsList.${this.primaryKeyValue}`
      return await Cache.rememberWait(cacheKey, async () => {
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

      // ---------------------

      let currentSeqID
      let groups = await this.getGroups()
      for (currentSeqID = 0; currentSeqID < list.length; currentSeqID++) {
        let group = groups[currentSeqID]

        if (group === null || group === undefined) {
          group = new WebpageGroup()
          group.group_seq_id = currentSeqID

          await this.groups().save(group)
        }

        // ----------------------

        let usersToAdd = list[currentSeqID]
        await group.setUsers(usersToAdd)

        // ----------------------

        delete groups[currentSeqID]
      }

      for (let i in groups) {
        await groups[i].users().detach()
        await groups[i].delete()
      }

      await Cache.forget(`User.getUserIDsInGroup.${this.primaryKeyValue}`)

      await Cache.forget(`Webpage.getReadersNotInGroup.${this.primaryKeyValue}`)
      await Cache.forget(`Webpage.getReaderIDsNotInGroup.${this.primaryKeyValue}`)
      await Cache.forget(`Webpage.getGroupsList.${this.primaryKeyValue}`)

    }
    
    
  // ------------------
  
  Model.prototype.getReadersNotInGroup = async function () {
    let idsList = await this.getReaderIDsNotInGroup()
    let readers = await User
            .query()
            .whereIn('id', idsList)
            .fetch()
    return readers
  }
  
  Model.prototype.getReaderIDsNotInGroup = async function () {
    let cacheKey = `Webpage.getReaderIDsNotInGroup.${this.primaryKeyValue}`
    let output = await Cache.rememberWait(cacheKey, async () => {
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
      return users.toJSON().map(user => user.id)
    })
  
    //await Cache.forever(cacheKey, output)
    return output
  }
  
  } // register (Model) {
}

module.exports = WebpageGroup
