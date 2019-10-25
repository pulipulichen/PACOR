'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WebpageSchema extends Schema {
  up () {
    this.create('webpages', (table) => {
      table.increments()
      table.integer('domain_id').notNullable().unsigned().references('id').inTable('domains').onDelete('cascade')
      table.string('url', 254).notNullable()
      table.text('title')
      table.text('config')  // json
      table.text('agreement')
      table.timestamps()
    })
  }

  down () {
    this.drop('webpages')
  }
}

module.exports = WebpageSchema
