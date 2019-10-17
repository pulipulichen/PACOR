'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RecallTestSchema extends Schema {
  up () {
    this.create('recall_tests', (table) => {
      table.increments()
      table.string('type', 60).notNullable().defaultTo('pre-test')
      table.text('response')
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('recall_tests')
  }
}

module.exports = RecallTestSchema
