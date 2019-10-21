'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('App/Models/CustomizedModel/CustomizedModel')

class AnnotationAttirbutes extends Model {
  annotation () {
    return this.belongsTo('App/Models/Anntation')
  }
}

module.exports = AnnotationAttirbutes