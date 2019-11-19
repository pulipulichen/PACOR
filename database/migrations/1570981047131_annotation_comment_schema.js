'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationCommentSchema extends Schema {
  up () {
    this.create('annotation_comments', (table) => {
      table.increments()
      //table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('annotation_id').notNullable().unsigned().references('id').inTable('annotations').onDelete('cascade')
      
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('type', 60).defaultTo('replay')
      table.text('note').notNullable()
      table.boolean('deleted').defaultTo(false)
      
      table.json('properties')
      
      table.bigInteger('created_at_unixms')
      table.bigInteger('updated_at_unixms')
      table.timestamps()
    })
  }

  down () {
    this.drop('annotation_comments')
  }
}

module.exports = AnnotationCommentSchema
