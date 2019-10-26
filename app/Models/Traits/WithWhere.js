'use strict'

/**
 * @author Pulipuli Chen 20191026 
 * 雖然先做了...但也不確定能不能用，先這樣吧
 */
class WithWhere {
  
  register (Model) {
    let query = Model.query
    Model.query = function () {
      let queryBuilder = query()
    
      queryBuilder.with = function (relation, field, operator, value) {
        let callback = field
        if (typeof(field) === 'string' 
                && typeof(operator) === 'string' 
                && typeof(value) !== 'undefined') {
          if (typeof(value) === 'object'
                  && typeof(value.primaryKeyValue) === 'number') {
            callback = (builder) => {
              builder.where(field, operator, value.primaryKeyValue)
            }
          }
          else {
            callback = (builder) => {
              builder.where(field, operator, value)
            }
          }
        }
        else if (typeof(field) === 'string' 
                && typeof(operator) !== 'undefined') {
          if (typeof(operator) === 'object'
                  && typeof(operator.primaryKeyValue) === 'number') {
            callback = (builder) => {
              builder.where(field, operator.primaryKeyValue)
            }
          }
          else {
            callback = (builder) => {
              builder.where(field, operator)
            }
          }
        }
        else if (typeof(field) === 'number') {
          callback = (builder) => {
            const { relationInstance } = this._parseRelation(relation)
            builder.where(relationInstance.primaryKey, field)
          }
        }
        else if (typeof(field) === 'object'
                && typeof(field.primaryKeyValue) === 'number') {
          callback = (builder) => {
            //console.log('ok')
            const { relationInstance } = this._parseRelation(relation)
            builder.where(relationInstance.primaryKey, field.primaryKeyValue)
          }
        }
        else if (Array.isArray(field)) {
          if (typeof(field[0]) === 'number') {
            callback = (builder) => {
              const { relationInstance } = this._parseRelation(relation)
              //console.log(relationInstance)
              builder.whereIn(relationInstance.primaryKey, field)
            }
          }
          else {
            callback = (builder) => {
              builder.where(field)
            }
          }
        }

        this._eagerLoads[relation] = callback
        return this
      }

      return queryBuilder
    }
  }
}

module.exports = WithWhere
