'use strict'

const Cache = use('Cache')
const UserModel = use('App/Models/User')

//const WebpageGroupModel = use('App/Models/WebpageGroup')

class WebpageExport {

  register(Model) {
    Model.prototype.exportQuestionnaire = async function () {
      let output = []
      
      
      
      return output
    }
    
    Model.prototype.exportAnnotations = async function () {
      let output = []
      
      return output
    }
    
  } // register (Model) {
}

module.exports = WebpageExport
