'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminActivityLogSchema extends Schema {
  up () {
    this.create('admin_activity_logs', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('type', 60).notNullable()
      table.text('log') // json
      table.timestamps()
    })
  }

  down () {
    this.drop('admin_activity_logs')
  }
}

module.exports = AdminActivityLogSchema
