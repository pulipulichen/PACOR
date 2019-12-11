'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationAnchorPositionsSchema extends Schema {
  up () {
    this.create('anchor_positions', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.string('type', 60).defaultTo('textContent')
      table.integer('section_id').notNullable()
      table.integer('seq_id')
      table.string('paragraph_id', 256)
      table.integer('start_pos')
      table.integer('end_pos')
      table.text('anchor_text')
      table.json('properties') // json
      table.timestamps()
    })
  }

  down () {
    this.drop('anchor_positions')
  }
}

module.exports = AnnotationAnchorPositionsSchema
