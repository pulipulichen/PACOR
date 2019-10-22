'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationSchema extends Schema {
  up () {
    this.create('annotations', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('start_pos').notNullable()
      table.integer('end_pos').notNullable()
      table.integer('annotation_anchor_text_id').notNullable().unsigned().references('id').inTable('annotation_anchor_texts').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('type', 60).defaultTo('mainIdea')
      table.text('note')
      table.boolean('private').defaultTo(false)
      table.boolean('deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('annotations')
  }
}

module.exports = AnnotationSchema
