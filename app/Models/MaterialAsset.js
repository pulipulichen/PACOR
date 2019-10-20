'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('App/Models/CustomizedModel/CustomizedModel')

const ADMIN_ROLES = [
  'global_admin',
  'domain_admin',
]

class MaterialAsset extends Model {
  static get table () {
    return 'material_assets'
  }
  
  static get computed () {
    return ['date']
  }
  
  domain () {
    return this.belongsTo('App/Models/Domain')
  }
  
  isEditable (user) {
    let role = user.role
    return (ADMIN_ROLES.indexOf(role) > -1
            && user.domain_id === this.domain_id)
  }
  
  getDate ({created_at}) {
    return created_at.slice(0, created_at.indexOf(' '))
  }
}

module.exports = MaterialAsset
