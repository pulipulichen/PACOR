'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

let tableName = 'webpage_articles'
class WebpageArticleSchema extends Schema {
  up () {
    this.create(tableName, (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.json('article').notNullable()  // json 用來保存原始文章的文字內容
      table.json('idea_units')  // json 用來保存簡易分析後的結果
      table.text('idea_units_note') // 用來保存對idea units 編輯的結果
      table.timestamps()
    })
  }

  down () {
    this.drop(tableName)
  }
}

module.exports = WebpageArticleSchema
