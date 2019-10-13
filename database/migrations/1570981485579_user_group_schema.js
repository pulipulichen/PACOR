'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserGroupSchema extends Schema {
  up () {
    this.create('user_groups', (table) => {
      table.increments()
      table.integer('group_id').notNullable()
      table.integer('domain_id').notNullable().unsigned().references('id').inTable('domains')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_groups')
  }
}

module.exports = UserGroupSchema
