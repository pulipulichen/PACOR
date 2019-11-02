'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationSchema extends Schema {
  up () {
    this.create('annotation_anchor_texts_annotations', (table) => {
      table.increments()
      table.integer('annotation_anchor_text_id').notNullable().unsigned().references('id').inTable('annotation_anchor_texts').onDelete('cascade')
      table.integer('annotation_id').notNullable().unsigned().references('id').inTable('annotations').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('annotations')
  }
}

module.exports = AnnotationSchema
