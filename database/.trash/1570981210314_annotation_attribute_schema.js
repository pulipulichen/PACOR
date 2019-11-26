'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationAttributeSchema extends Schema {
  up () {
    this.create('annotation_attributes', (table) => {
      table.increments()
      table.integer('annotation_id').notNullable().unsigned().references('id').inTable('annotations').onDelete('cascade')
      table.string('name', 60).notNullable()
      table.text('value') // format
      table.timestamps()
    })
  }

  down () {
    this.drop('annotation_attributes')
  }
}

module.exports = AnnotationAttributeSchema
