'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationReplySchema extends Schema {
  up () {
    this.create('annotation_replies', (table) => {
      table.increments()
      table.integer('to_annotation_id').notNullable().unsigned().references('id').inTable('annotations').onDelete('cascade')
      table.integer('from_annotation_id').notNullable().unsigned().references('id').inTable('annotations').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('annotation_replies')
  }
}

module.exports = AnnotationReplySchema
