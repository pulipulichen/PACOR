'use strict'

const Env = use('Env')

let TestBrowserHelper = function (title, config) {

  const { test, trait } = use('Test/Suite')(title)

  trait('Test/ApiClient')
  trait('Session/Client')
  trait('Test/Browser', {
    headless: (Env.get('TEST_BROWSER_HEADLESS') === 'true'),
    dumpio: true  // Log all browser console messages to the terminal.
  })

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