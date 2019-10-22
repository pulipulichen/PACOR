'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CacheSchema extends Schema {
  up () {
    this.create('cache', (table) => {
      table.string('key').notNullable().unique()
      table.text('value')
      table.integer('expiration')
    })
  }

  down () {
    this.drop('cache')
  }
}

module.exports = CacheSchema
