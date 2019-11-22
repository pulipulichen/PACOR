'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserNotificationSchema extends Schema {
  up () {
    this.create('user_notifications', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('trigger_user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('model', 60).notNullable()
      table.integer('model_id').notNullable()
      table.json('summary')  // json
      
      table.boolean('has_read').defaultTo(false)
      table.boolean('deleted').defaultTo(false)
      
      table.bigInteger('created_at_unixms')
      table.bigInteger('updated_at_unixms')
      
      table.timestamps()
    })
  }

  down () {
    this.drop('user_notifications')
  }
}

module.exports = UserNotificationSchema
