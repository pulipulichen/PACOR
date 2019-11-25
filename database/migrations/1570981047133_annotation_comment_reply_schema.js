'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

/**
 * 這是給有指定人的時候使用
 * 
 * 多對多關係
 * 這是給privot表格使用
 */
class AnnotationCommentReplySchema extends Schema {
  up () {
    this.create('annotation_comment_replies', (table) => {
      table.increments()
      //table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('from_comment_id').notNullable().unsigned().references('id').inTable('annotation_comments').onDelete('cascade')
      table.integer('to_comment_id').notNullable().unsigned().references('id').inTable('annotation_comments').onDelete('cascade')
      
      //table.timestamps()
    })
  }

  down () {
    this.drop('annotation_comment_replies')
  }
}

module.exports = AnnotationCommentReplySchema
