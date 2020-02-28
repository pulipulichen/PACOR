'use strict'

const Cache = use('Cache')
const UserModel = use('App/Models/User')

//const WebpageGroupModel = use('App/Models/WebpageGroup')

class WebpageExport {

  register(Model) {
    Model.prototype.getReaders = async function (process) {
      let output = []
      
      // --------------------
      
      let groups = await this.groups()
            .with('users')
            .fetch()
      
      for (let i = 0; i < groups.size(); i++) {
        
        let group = groups.nth(i)
        
        
        let readers = group.$relations.users
        for (let j = 0; j < readers.size(); j++) {
          let row = {}
          row.group_id = i
          
          let reader = readers.nth(j)
          let readerJSON = reader.toJSON()
          
          if (typeof(process) === 'function') {
            let processedJSON = await process(reader)
            if (processedJSON && typeof(processedJSON) === 'object') {
              Object.keys(processedJSON).forEach((key) => {
                readerJSON[key] = processedJSON[key]
              })
            }
          }
          
          if (readerJSON && typeof(readerJSON) === 'object') {
            Object.keys(readerJSON).forEach((key) => {
              row[key] = readerJSON[key]
            })
          }
          
          output.push(row)
        }
      }
      
      // ----------------------
      
      let others = await this.getUsersNotInGroup(true)
      for (let j = 0; j < others.size(); j++) {
        let row = {}
        row.group_id = -1

        let reader = others.nth(j)
        let readerJSON = reader.toJSON()
        
        if (readerJSON.role !== 'reader') {
          continue
        }
        
        readerJSON = {
          id: readerJSON.id,
          username: readerJSON.username,
          display_name: readerJSON.display_name,
        }

        if (typeof(process) === 'function') {
          let processedJSON = await process(reader)
          if (processedJSON && typeof(processedJSON) === 'object') {
            console.log(processedJSON)
            Object.keys(processedJSON).forEach((key) => {
              readerJSON[key] = processedJSON[key]
            })
          }
        }

        if (typeof(readerJSON) === 'object') {
          Object.keys(readerJSON).forEach((key) => {
            row[key] = readerJSON[key]
          })
        }

        output.push(row)
      }
      
      return output
    }
    
    Model.prototype.exportQuestionnaire = async function () {
      let output = await this.getReaders(async (reader) => {
        return {
          ok: 'test'
        }
      })
      
      return output
    }
    
    Model.prototype.exportAnnotations = async function () {
      let output = []
      
      return output
    }
    
  } // register (Model) {
}

module.exports = WebpageExport
