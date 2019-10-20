'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectionAnnotationReplySchema extends Schema {
  up () {
    this.create('section_annotation_replies', (table) => {
      table.increments()
      table.integer('section_annotation_id').notNullable().unsigned().references('id').inTable('annotations').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('type', 60).notNullable().defaultTo('highlight')
      table.text('note').notNullable()
      table.boolean('deleted').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('section_annotation_replies')
  }
}

module.exports = SectionAnnotationReplySchema
