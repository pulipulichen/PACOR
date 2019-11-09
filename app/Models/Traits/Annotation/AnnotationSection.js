'use strict'

const HttpException = use('HttpException')

class AnnotationSection {

  register(Model) {
    Model.getSectionsAnnotation = async function (webpage, user, query) {
      throw new HttpException('@TODO')
    }
  } // register (Model) {
}

module.exports = AnnotationSection
