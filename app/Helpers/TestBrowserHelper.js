'use strict'

let TestBrowserHelper = function (title, config) {

  const { test, trait } = use('Test/Suite')(title)

  trait('Test/ApiClient')
  trait('Session/Client')
  trait('Test/Browser')

  let errors = []

  test(title, async function (args) {
    
    for (let name in config) {
      try {
        console.log('Running: ' + name)
        await config[name](args)
      }
      catch (e) {
        console.log(`[${name}]`, e)
        errors.push(`[${name}] ` + e.message)
        //throw e
      }
    }
    
    if (errors.length > 0) {
      throw new Error('\n\n' + errors.join('\n') + '\n')
    }
  }).timeout(0)
  
}

module.exports = TestBrowserHelper