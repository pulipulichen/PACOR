'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.integer('domain_id').notNullable().unsigned().references('id').inTable('domains')
      table.string('username', 80).notNullable()
      //table.string('email', 254).notNullable().unique()
      table.string('email', 254)
      table.string('password', 60)
      table.string('role', 60).notNullable().defaultTo('reader')
      table.string('display_name', 20)
      table.string('avatar', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
