'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupUserSchema extends Schema {
  up () {
    this.create('group_user', (table) => {
      table.increments()
      table.integer('webpage_group_id').notNullable().unsigned().references('id').inTable('webpage_groups').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('group_user')
  }
}

module.exports = GroupUserSchema
