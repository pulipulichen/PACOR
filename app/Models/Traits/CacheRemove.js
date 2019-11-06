'use strict'

const Cache = use('Cache')

class CacheRemove {
  
  register (Model, attrs) {
    
    let removeCache = async (instance) => {
      let tags = Cache.buildTags(instance)
      //console.log(tags)
      await Cache.tags(tags).flush()
      //await Cache.flush()
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
