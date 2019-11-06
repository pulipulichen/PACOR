'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationNoteSchema extends Schema {
  up () {
    this.create('annotation_notes', (table) => {
      table.increments()
      table.integer('annotation_id').notNullable().unsigned().references('id').inTable('annotations').onDelete('cascade')
      table.string('type', 60).defaultTo('default')
      table.text('note')
      table.json('properties')
      table.timestamps()
    })
  }

  down () {
    this.drop('annotation_notes')
  }
}

module.exports = AnnotationNoteSchema
