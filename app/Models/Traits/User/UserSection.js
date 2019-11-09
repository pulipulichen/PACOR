'use strict'

class UserSection {

  register(Model) {
    
    
    Model.prototype.getSectionsChecklist = async function (webpage) {
      let log = await this.getReadingProgressLog(webpage)
      
      if (Array.isArray(log.checklist)) {
        return log.checklist
      }
      else {
        return []
      }
    }
  } // register (Model) {
}

module.exports = UserSection
