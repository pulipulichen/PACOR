'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnchorPositionsAnnotationSchema extends Schema {
  up () {
    this.create('anchor_positions_annotations', (table) => {
      table.increments()
      table.integer('anchor_position_id').notNullable().unsigned().references('id').inTable('anchor_positions').onDelete('cascade')
      table.integer('annotation_id').notNullable().unsigned().references('id').inTable('annotations').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('annotations')
  }
}

module.exports = AnchorPositionsAnnotationSchema
