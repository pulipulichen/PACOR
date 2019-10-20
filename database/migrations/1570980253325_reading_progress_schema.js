'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReadingProgressSchema extends Schema {
  up () {
    this.create('reading_progresses', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('step').notNullable()
      table.bitInteger('start_timestamp').notNullable()
      table.bitInteger('end_timestamp').notNullable()
      table.json('log')
      table.timestamps()
    })
  }

  down () {
    this.drop('reading_progresses')
  }
}

module.exports = ReadingProgressSchema
