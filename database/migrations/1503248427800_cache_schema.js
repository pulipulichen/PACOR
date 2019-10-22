'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CacheSchema extends Schema {
  static get connection () {
    return 'sqlite_cache'
  }
  
  up () {
    this.create('cache', (table) => {
      table.string('key').notNullable()
      table.string('key_id')
      table.text('value')
    })
  }

  down () {
    this.drop('cache')
  }
}

module.exports = CacheSchema
