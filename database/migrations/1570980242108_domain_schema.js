'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DomainSchema extends Schema {
  up () {
    this.create('domains', (table) => {
      table.increments()
      table.string('domain', 254).notNullable()
      table.text('title').notNullable().defaultTo('')
      table.timestamps()
    })
  }

  down () {
    this.drop('domains')
  }
}

module.exports = DomainSchema
