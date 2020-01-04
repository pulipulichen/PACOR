'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoteConsoleLogSchema extends Schema {
  up () {
    this.create('remote_console_logs', (table) => {
      table.increments()
      table.string('referer', 255).notNullable()
      table.string('user', 255).notNullable()
      table.text('message').notNullable()
      table.string('type', 10).notNullable()
      
      table.bigInteger('created_at_unixms')
      table.bigInteger('updated_at_unixms')
      table.timestamps()
    })
  }

  down () {
    this.drop('remote_console_logs')
  }
}

module.exports = RemoteConsoleLogSchema
