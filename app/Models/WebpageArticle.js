/* global use */

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class WebpageArticle extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('JSONCase', 'article')
    this.addTrait('JSONCase', 'idea_units')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
}

module.exports = WebpageArticle