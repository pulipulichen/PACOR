'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnnotationCommentRateSchema extends Schema {
  up () {
    this.create('annotation_comment_rates', (table) => {
      table.increments()
      //table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('annotation_comment_id').notNullable().unsigned().references('id').inTable('annotation_comments').onDelete('cascade')
      
      // 這個是指是誰的評分
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('type', 60).defaultTo('like')  // like null dislike
      table.boolean('deleted').defaultTo(false)
      
      table.bigInteger('created_at_unixms')
      table.bigInteger('updated_at_unixms')
      table.timestamps()
    })
  }

  down () {
    this.drop('annotation_comment_rates')
  }
}

module.exports = AnnotationCommentRateSchema
