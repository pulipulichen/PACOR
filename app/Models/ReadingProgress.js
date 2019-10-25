'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const ModelHelper = use('App/Helpers/ModelHelper')

/**
table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
table.string('step_name', 60).notNullable()
table.bigInteger('activity_seconds').defaultTo(0)
table.bigInteger('start_timestamp').notNullable()
table.bigInteger('end_timestamp')
table.json('log')
 */
class ReadingProgress extends Model {
  static boot () {
    super.boot()
    
    ModelHelper.addJSONCaseHook(this, 'log')
  }
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  getIsCompleted ({end_timestamp}) {
    //console.log(end_timestamp, typeof(end_timestamp))
    //return (isNaN(end_timestamp) === false)
    return (end_timestamp !== null && end_timestamp !== undefined)
  }
  
  static get computed () {
    return ['duration', 'isCompleted']
  }
  
  getDuration ({start_timestamp, end_timestamp}) {
    if (end_timestamp === null) {
      return null
    }
    else {
      if (typeof(start_timestamp) === 'string'
              && isNaN(start_timestamp) === false) {
        start_timestamp = parseInt(start_timestamp, 10)
      }
      if (typeof(end_timestamp) === 'string'
              && isNaN(end_timestamp) === false) {
        end_timestamp = parseInt(end_timestamp, 10)
      }
      
      if (typeof(end_timestamp) === 'number' 
              && typeof(start_timestamp) === 'number') {
        return end_timestamp - start_timestamp
      }
      else {
        return null
      }
    }
  }
  
  getStartTimestamp (timestamp) {
    if (timestamp === null) {
      return null
    }
    else if (isNaN(timestamp) === false) {
      return parseInt(timestamp, 10)
    }
    else {
      return null
    }
  }
  
  getEndTimestamp (timestamp) {
    if (timestamp === null) {
      return null
    }
    else if (isNaN(timestamp) === false) {
      //console.log(timestamp, isNaN(timestamp), typeof(timestamp))
      return parseInt(timestamp, 10)
    }
    return null
  }
}

module.exports = ReadingProgress
