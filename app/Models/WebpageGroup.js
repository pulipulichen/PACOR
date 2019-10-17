'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class WebpageGroup extends Model {
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  users () {
    return this.belongsToMany('App/Models/User')
            .pivotTable('group_user')
  }
}

module.exports = WebpageGroup
