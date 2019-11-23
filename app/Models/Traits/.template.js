'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 

class Template {

  register(Model) {
    
    Model.method = async function (webpage, user, options) {
      let cacheKey = Cache.key('method')
      return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
        
      })
    }
    
  } // register (Model) {
}

module.exports = Template
