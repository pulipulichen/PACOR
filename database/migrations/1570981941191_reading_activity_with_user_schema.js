'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReadingActivityWithUserSchema extends Schema {
  up () {
    this.create('reading_activity_with_users', (table) => {
      table.increments()
      table.integer('reading_activity_log_id').notNullable().unsigned().references('id').inTable('reading_activity_logs').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      //table.timestamps()
    })
  }

  down () {
    this.drop('reading_activity_with_users')
  }
}

module.exports = ReadingActivityWithUserSchema
