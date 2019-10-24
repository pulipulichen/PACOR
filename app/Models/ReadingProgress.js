'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

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
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  getIsCompleted ({end_timestamp}) {
    return (end_timestamp !== null)
  }
  
  static get computed () {
    return ['duration', 'isCompleted']
  }
  
  getDuration ({start_timestamp, end_timestamp}) {
    if (end_timestamp === null) {
      return null
    }
    else {
      return end_timestamp - start_timestamp
    }
  }
}

module.exports = ReadingProgress
