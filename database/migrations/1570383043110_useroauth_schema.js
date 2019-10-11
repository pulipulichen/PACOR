'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UseroauthSchema extends Schema {
  up () {
    this.create('user_oauths', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('driver', 254).notNullable()
      table.integer('oauth_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_oauths')
  }
}

module.exports = UseroauthSchema
