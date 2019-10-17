'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('Model')

class Model extends BaseModel {
  async fetch () {
    let serializers = await super.fetch()
    console.log(serializers)
    serializers.forEach = function (callback) {
      this.rows.forEach(callback)
    }
    
    return serializers
  }
}

module.exports = Model
