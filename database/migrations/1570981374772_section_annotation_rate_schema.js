'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectionAnnotationRateSchema extends Schema {
  up () {
    this.create('section_annotation_rates', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('section_annotation_id').notNullable().unsigned().references('id').inTable('annotations').onDelete('cascade')
      table.integer('rater_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('type', 60).defaultTo('like')  // like null dislike
      table.boolean('deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('section_annotation_rates')
  }
}

module.exports = SectionAnnotationRateSchema
