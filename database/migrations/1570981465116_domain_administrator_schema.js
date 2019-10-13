'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DomainAdministratorSchema extends Schema {
  up () {
    this.create('domain_administrators', (table) => {
      table.increments()
      table.integer('domain_id').notNullable().unsigned().references('id').inTable('domains')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('domain_administrators')
  }
}

module.exports = DomainAdministratorSchema
