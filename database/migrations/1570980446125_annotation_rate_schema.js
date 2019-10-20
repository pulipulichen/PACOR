'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationRateSchema extends Schema {
  up () {
    this.create('annotation_rates', (table) => {
      table.increments()
      table.integer('annotation_id').notNullable().unsigned().references('id').inTable('annotations').onDelete('cascade')
      table.integer('rater_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('type', 60).defaultTo('like')  // like null dislike
      table.boolean('deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('annotation_rates')
  }
}

module.exports = AnnotationRateSchema
