'use strict'

//const HttpException = use('HttpException')
const {HttpException} = use('@adonisjs/generic-exceptions') 
const AnnotationModel = use('App/Models/Annotation')

class AnnotationSection {

  register(Model) {
    Model.getSectionsAnnotation = async function (webpage, user, query) {
      //throw new HttpException('@TODO')
      //return []
      
      let annotations = await this.findByWebpageGroupPosition(webpage, user, {
        onlySectionAnnotation: true
      })
      
      console.log(annotations.size())
      
      return []
    }
  } // register (Model) {
}

module.exports = AnnotationSection
