'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectionAnnotationSchema extends Schema {
  up () {
    this.create('section_annotations', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('section_seq_id').notNullable()
      table.boolean('finished').defaultTo(false)
      table.text('note')
      table.json('checklist')
      table.timestamps()
    })
  }

  down () {
    this.drop('section_annotations')
  }
}

module.exports = SectionNoteSchema
