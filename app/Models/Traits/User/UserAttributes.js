'use strict'

const SpreadsheetHelper = use('App/Helpers/SpreadsheetHelper')
const IdeaHelper = use('App/Helpers/IdeaHelper')

class UserAttributes {

  register(Model) {
    
    let userAttributes
    
    let initUserAttributes = function () {
      if (userAttributes) {
        return true
      }
      
      let sheetJSON = SpreadsheetHelper.parseFileToJSON('./config/attributesData/userAttributes.ods')
      
      if (sheetJSON.length === 0) {
        return false
      }
      //console.log(sheetJSON)
      userAttributes = {}
      sheetJSON.forEach(line => {
        let username = line.username
        userAttributes[username] = line
      })
    } // let initUserAttributes = function () {
    
    Model.prototype.getAttribute = function (attributeName, defaultValue) {
      initUserAttributes()
      
      if (typeof(userAttributes[this.username]) === 'undefined') {
        let errorMessage = 'username is not found: ' + this.username
        //console.log(defaultValue, typeof(defaultValue))
        if (typeof(defaultValue) !== 'undefined') {
          console.log(errorMessage)
          return defaultValue
        }
        
        throw new Error(errorMessage)
        return undefined
      }
      else if (typeof(userAttributes[this.username][attributeName]) === 'undefined') {
        let errorMessage = 'attributeName is not found: ' + this.username + ' ' + attributeName
        if (typeof(defaultValue) !== 'undefined') {
          console.log(errorMessage)
          return defaultValue
        }
        
        //console.log(userAttributes[this.username])
        throw new Error(errorMessage)
        return defaultValue
      }
      else {
        let value = userAttributes[this.username][attributeName]
        if (isNaN(value) === false) {
          value = Number(value)
        }
        return value
      }
    }
    
    Model.prototype.getAttributeRecallTextbaseIdeas = function () {
      let ideas = this.getAttribute('codes_recall')
      return IdeaHelper.filterTextbaseIdea(ideas)
    }
    
  } // register (Model) {
  
  
}

module.exports = UserAttributes
