'use strict'

let DatabaseHelper = {
  toSQL: function (query) {
    let {sql, bindings} = query.toSQL().toNative()
    
    bindings.forEach((value, i) => {
      if (typeof(value) === 'string') {
        value = `'${value}'`
      }
      sql = sql.replace('$' + (i+1), value)
    })
    
    return sql
  }
}

module.exports = DatabaseHelper