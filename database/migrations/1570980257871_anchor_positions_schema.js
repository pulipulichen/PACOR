'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationAnchorPositionsSchema extends Schema {
  up () {
    this.create('anchor_positions', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.string('type', 60).defaultTo('textContent')
      table.integer('paragraph_seq_id').notNullable()
      table.string('paragraph_id', 256).notNullable()
      table.integer('start_pos').notNullable()
      table.integer('end_pos').notNullable()
      table.text('anchor_text').notNullable()
      table.json('properties') // json
      table.timestamps()
    })
  }

  down () {
    this.drop('anchor_positions')
  }
}

module.exports = AnnotationAnchorPositionsSchema
