'use strict'

//const HttpException = use('HttpException')
const {HttpException} = use('@adonisjs/generic-exceptions') 
const AnnotationModel = use('App/Models/Annotation')

class AnnotationSection {

  register(Model) {
    Model.getSectionsAnnotation = async function (webpage, user, query) {
      //throw new HttpException('@TODO')
      //return []
      
      let annotations = this.findByWebpageGroupPosition(webpage, user, {
        onlySectionAnnotation: true
      })
    }
  } // register (Model) {
}

module.exports = AnnotationSection
