'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Webpage extends Model {
  
  /*
  static boot () {
    super.boot()
  }
  */
  
  domain () {
    return this.belongsTo('App/Models/Domain')
  }
  
  annotations () {
    return this.hasMany('App/Models/annotations')
  }
  
}

module.exports = Webpage
