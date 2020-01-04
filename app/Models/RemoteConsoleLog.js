'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RemoteConsoleLog extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('DateUnixMS')
  }
  
  static async list (afterTime) {
    if (typeof(afterTime) === 'string' 
            && isNaN(afterTime) === false) {
      afterTime = parseInt(afterTime, 10)
    }
    if (typeof(afterTime) === 'number') {
      return await this.query()
              .orderBy('created_at_unixms', 'desc')
              .where('created_at_unixms', '>', afterTime)
              .fetch()
    }
    else {
      return await this.query()
              .orderBy('created_at_unixms', 'desc')
              .pick(10)
    }
  }
}

module.exports = RemoteConsoleLog
