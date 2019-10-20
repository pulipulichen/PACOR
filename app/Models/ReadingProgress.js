'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ReadingProgress extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  isCompleted () {
    return (this.end_timestamp !== null)
  }
  
  static get computed () {
    return ['duration']
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
