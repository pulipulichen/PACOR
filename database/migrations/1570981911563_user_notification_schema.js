'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserNotificationSchema extends Schema {
  up () {
    this.create('user_notifications', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.string('type', 60).notNullable()
      table.json('notification').notNullable()
      table.boolean('readed').notNullable().defaultTo(false)
      table.boolean('deleted').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_notifications')
  }
}

module.exports = UserNotificationSchema
