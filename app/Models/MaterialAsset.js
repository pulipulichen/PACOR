'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MaterialAsset extends Model {
  static get table () {
    return 'material_assets'
  }
}

module.exports = MaterialAsset
