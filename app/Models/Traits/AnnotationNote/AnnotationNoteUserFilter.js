'use strict'

class AnnotationNoteUserFilter {

  register(Model) {
    
    Model.getInit = async function (webpage, user, options) {
      throw new Error('@TODO')
    }
    
    Model.getUserWords = async function (webpage, user, options) {
      throw new Error('@TODO')
    }
    
  } // register (Model) {
}

module.exports = AnnotationNoteUserFilter
