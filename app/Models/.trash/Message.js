'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', async (instance) => {
      instance.timestamp = (new Date()).getTime()
    })
    
  }
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  static async list (origin, limit = 10) {
    let transaction = Message
            .query()
            .with('user')
            .whereHas('user', (builder) => {
              builder.where('origin', origin)
            })
    
    let messages
    if (typeof(limit) !== 'number') {
      messages = await transaction.fetch()
    }
    else {
      messages = await transaction.pickInverse(limit)
    }
    return messages
  }
}

module.exports = Message
