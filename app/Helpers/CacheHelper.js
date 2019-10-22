/* global __dirname */

const Database = use('Database')

let CacheHelper = {
  _table: null,
  getDB: async function () {
    if (this._table !== null) {
      return this._table
    }
    this._table = await Database.connection('sqlite_cache').table('cache')
    
    return this._table
  },
  put: async function (key, key_id, value, exper) {
    let table = await this.getDB()
    
    if (typeof(key_id) !== 'undefined'
            && value === undefined) {
      value = key_id
      key_id = undefined
    }
    
    let condition = {
      key: key
    }
    if (typeof(key_id) !== 'undefined'){
      condition.key_id = key_id
    }
    
    const affectedRows = await table
            .where(condition)
            .update({
              value: value
            })
            
    if (affectedRows === 0) {
      
    }
  }
}

module.exports = CacheHelper