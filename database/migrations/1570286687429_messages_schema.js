'use strict'

// 稍晚我們就把它刪除吧

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.text('message').notNullable()
      table.bigInteger('timestamp').notNullable()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessagesSchema
