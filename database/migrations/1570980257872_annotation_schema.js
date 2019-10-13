'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationSchema extends Schema {
  up () {
    this.create('annotations', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.integer('start_pos').notNullable()
      table.integer('end_pos').notNullable()
      table.string('type', 60).notNullable().defaultTo('highlight')
      table.text('note').notNullable()
      table.boolean('deleted').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('annotations')
  }
}

module.exports = AnnotationSchema