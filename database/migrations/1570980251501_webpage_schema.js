'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WebpageSchema extends Schema {
  up () {
    this.create('webpages', (table) => {
      table.increments()
      table.integer('domain_id').notNullable().unsigned().references('id').inTable('domains').onDelete('cascade')
      table.string('path', 254).notNullable()
      table.text('title')
      table.json('config')
      table.timestamps()
    })
  }

  down () {
    this.drop('webpages')
  }
}

module.exports = WebpageSchema
