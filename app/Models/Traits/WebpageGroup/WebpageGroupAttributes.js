'use strict'

const SpreadsheetHelper = use('App/Helpers/SpreadsheetHelper')

class WebpageGroupAttributes {

  register(Model) {
    
    
    let groupAttributes
    
    let initGroupAttributes = function () {
      if (groupAttributes) {
        return true
      }
      
      let sheetJSON = SpreadsheetHelper.parseFileToJSON('./config/attributesData/groupAttributes.ods')
      
      if (sheetJSON.length === 0) {
        return false
      }
      //console.log(sheetJSON)
      groupAttributes = {}
      sheetJSON.forEach(line => {
        let users = line.users
        groupAttributes[users] = line
      })
    } // let initUserAttributes = function () {
    
    Model.getAttributeList = function (attributeName) {
      initGroupAttributes()
      return Object.keys(groupAttributes).map(users => groupAttributes[users][attributeName])
    }
    
    Model.prototype.getAttribute = async function (attributeName, defaultValue) {
      initGroupAttributes()
      let users = await this.getUsersDisplayName(true)
      users = users.join(' ')
      
      if (typeof(groupAttributes[users]) === 'undefined') {
        let errorMessage = 'users is not found: ' + users
        //console.log(defaultValue, typeof(defaultValue))
        if (typeof(defaultValue) !== 'undefined') {
          console.log(errorMessage)
          return defaultValue
        }
        
        throw new Error(errorMessage)
        return undefined
      }
      else if (typeof(groupAttributes[users][attributeName]) === 'undefined') {
        let errorMessage = 'attributeName is not found: ' + users + ': ' + attributeName
        if (typeof(defaultValue) !== 'undefined') {
          console.log(errorMessage)
          return defaultValue
        }
        
        //console.log(userAttributes[this.username])
        throw new Error(errorMessage)
        return defaultValue
      }
      else {
        let value = groupAttributes[users][attributeName]
        return value
      }
    }
    
  } // register (Model) {
  
  
}

module.exports = WebpageGroupAttributes
