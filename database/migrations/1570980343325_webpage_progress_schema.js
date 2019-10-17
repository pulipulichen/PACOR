'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WebpageProgressSchema extends Schema {
  up () {
    this.create('webpage_progresses', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('step').notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('webpage_progresses')
  }
}

module.exports = WebpageProgressSchema
