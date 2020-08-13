'use strict'

const XLSX = use('js-xlsx')

class UserAttributes {

  register(Model) {
    
    let userAttributes
    
    let initUserAttributes = function () {
      if (userAttributes) {
        return true
      }
      
      let workbook = XLSX.readFile('./config/userAttributes/userAttributes.ods');
      let sheet_name_list = workbook.SheetNames
      let sheet = workbook.Sheets[sheet_name_list[0]]
      let sheetJSON = XLSX.utils.sheet_to_json(sheet)
      
      if (sheetJSON.length === 0) {
        return false
      }
      console.log(sheetJSON)
      userAttributes = {}
      sheetJSON.forEach(line => {
        let username = line.username
        userAttributes[username] = line
      })
    }
    
    Model.prototype.getAttribute = function (attributeName, defaultValue) {
      initUserAttributes()
      
      if (!userAttributes[this.username]) {
        throw new Error('username is not found: ' + this.username)
        return undefined
      }
      else if (typeof(userAttributes[this.username][attributeName]) === 'undefined') {
        console.log(userAttributes[this.username])
        throw new Error('attributeName is not found: ' + this.username + ' ' + attributeName)
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
    
  } // register (Model) {
  
  
}

module.exports = UserAttributes
