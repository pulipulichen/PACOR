'use strict'

let TestHelper = function (title, config) {

  const { test, trait } = use('Test/Suite')(title)

  trait('Test/ApiClient')
  trait('Session/Client')

  Object.keys(config).forEach(name => {
    //test(name, config[name]).timeout(0)
    
    /*
    try {
      test(name, config[name]).timeout(0)
    }
    catch (e) {
      console.log('err')
    }
    */
    
    
    test(name, async function (args) {
      try {
        await config[name](args)
      }
      catch (e) {
        console.log(`[${name}]`, e)
        throw e
      }
    }).timeout(0)
  })
}

module.exports = TestHelper