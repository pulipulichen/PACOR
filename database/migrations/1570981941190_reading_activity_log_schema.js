'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReadingActivityLogSchema extends Schema {
  up () {
    this.create('reading_activity_logs', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('type', 60).notNullable()
      table.json('log')
      table.timestamps()
    })
  }

  down () {
    this.drop('reading_activity_logs')
  }
}

module.exports = ReadingActivityLogSchema
