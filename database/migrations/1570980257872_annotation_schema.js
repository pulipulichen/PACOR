'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationSchema extends Schema {
  up () {
    this.create('annotations', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      //table.integer('paragraphy_seq_id').notNullable()
      //table.string('paragraphy_id', 256).notNullable()
      //table.integer('start_pos').notNullable()
      //table.integer('end_pos').notNullable()
      //table.integer('annotation_anchor_text_id').notNullable().unsigned().references('id').inTable('annotation_anchor_texts').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('type', 60).defaultTo('mainIdea')
      table.text('note')
      table.boolean('public').defaultTo(true)
      table.boolean('deleted').defaultTo(false)
      table.bigInteger('created_at_unixms')
      table.bigInteger('updated_at_unixms')
      table.timestamps()
    })
  }

  down () {
    this.drop('annotations')
  }
}

module.exports = AnnotationSchema
