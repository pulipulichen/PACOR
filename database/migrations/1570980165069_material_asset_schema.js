'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MaterialAssetSchema extends Schema {
  up () {
    this.create('material_assets', (table) => {
      table.increments()
      table.string('filename', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('material_assets')
  }
}

module.exports = MaterialAssetSchema
