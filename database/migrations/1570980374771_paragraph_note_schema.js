'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParagraphNoteSchema extends Schema {
  up () {
    this.create('paragraph_notes', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('paragraph_id').notNullable()
      table.text('note').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('paragraph_notes')
  }
}

module.exports = ParagraphNoteSchema
