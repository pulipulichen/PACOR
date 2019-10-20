'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationReplySchema extends Schema {
  up () {
    this.create('annotation_replies', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('annotation_id').notNullable().unsigned().references('id').inTable('annotations').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('type', 60).notNullable().defaultTo('highlight')
      table.text('note').notNullable()
      table.boolean('deleted').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('annotation_replies')
  }
}

module.exports = AnnotationReplySchema
