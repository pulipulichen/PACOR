'use strict'

class UserSection {

  register(Model) {
    
    Model.prototype.getSectionsChecklist = async function (webpage) {
      let log = await this.getReadingProgressLog(webpage)
      
      if (typeof(log.checklist) === 'object' 
              && log.checklist !== null) {
        return log.checklist
      }
      else {
        return null
      }
    }
  } // register (Model) {
}

module.exports = UserSection
