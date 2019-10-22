'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const knex = require('knex')

class WebpageGroupSchema extends Schema {
  up () {
    this.create('webpage_groups', (table) => {
      table.increments()
      table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
      table.integer('group_seq_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('webpage_groups')
    //return knex.raw('DROP TABLE webpage_groups CASCADE')
  }
}

module.exports = WebpageGroupSchema
