'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DomainSchema extends Schema {
  up () {
    this.create('domains', (table) => {
      table.increments()
      table.string('domain', 254).notNullable().unique()
      table.text('title')
      table.json('config') // json
      table.text('agreement')
      table.timestamps()
    })
  }

  down () {
    this.drop('domains')
  }
}

module.exports = DomainSchema
