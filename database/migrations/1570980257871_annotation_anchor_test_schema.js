'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationAnchorTextSchema extends Schema {
  up () {
    this.create('annotation_anchor_texts', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('start_pos').notNullable()
      table.integer('end_pos').notNullable()
      table.text('anchor_text').notNullable()
      table.text('properties') // json
      table.timestamps()
    })
  }

  down () {
    this.drop('annotation_anchor_texts')
  }
}

module.exports = AnnotationAnchorTextSchema
