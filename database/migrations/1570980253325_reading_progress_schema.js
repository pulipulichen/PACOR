'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReadingProgressSchema extends Schema {
  up () {
    this.create('reading_progresses', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('step_name', 60).notNullable()
      table.bigInteger('start_timestamp').notNullable()
      table.bigInteger('end_timestamp')
      table.json('log')
      table.timestamps()
    })
  }

  down () {
    this.drop('reading_progresses')
  }
}

module.exports = ReadingProgressSchema
