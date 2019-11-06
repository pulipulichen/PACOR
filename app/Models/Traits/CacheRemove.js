'use strict'

const Cache = use('Cache')

class CacheRemove {
  
  register (Model, attrs) {
    
    let removeCache = async (instance) => {
      let tags = []
      if (typeof(instance.webpage_id) === 'number') {
        tags.push('Webpage_' + instance.webpage_id)
      }
      if (typeof(instance.user_id) === 'number') {
        tags.push('User_' + instance.user_id)
      }
      tags.push(instance.constructor.name)
      
      await Cache.tags(tags).flush()
    }
    
    // --------------------------
    
    Model.addHook('beforeSave', async (instance) => {
      await removeCache(instance)
    })
    
    Model.addHook('beforeDelete', async (instance) => {
      await removeCache(instance)
    })
    
    // ------------------------------------------
  }
}

module.exports = CacheRemove
