/* global Promise */

'use strict'

const Env = use('Env')
let envHeadless = (Env.get('TEST_BROWSER_HEADLESS') === 'true')

const Sleep = use('Sleep')
const rimraf = use('rimraf')

const TestConfigHelper = use('App/Helpers/Test/TestBrowserHelper/TestConfigHelper.js')

const exposeFunction = use('App/Helpers/Test/TestBrowserHelper/exposeFunction.js')
const excuteTest = use('App/Helpers/Test/TestBrowserHelper/excuteTest.js')
const handleException = use('App/Helpers/Test/TestBrowserHelper/handleException.js')
const setTraitBrowser = use('App/Helpers/Test/TestBrowserHelper/setTraitBrowser.js')
const setupWepbage = use('App/Helpers/Test/TestBrowserHelper/setupWepbage.js')



// ---------------------------------

let TestBrowserHelper = function (title, url, config, options) {
  
  let logManager = use('App/Helpers/Test/TestBrowserHelper/logManager.js')

  let {
    threads,
    mode,  // sequential, parallel
    headless,
    stopAt
  } = options

  const { test, trait } = use('Test/Suite')(title)

  if (stopAt) {
    config = TestConfigHelper(config, stopAt)
  }

  trait('Test/ApiClient')
  trait('Session/Client')
  
  if (headless === undefined) {
    headless = envHeadless
  }
  
  if (threads > 10) {
    process.setMaxListeners(0)

    if (headless === false) {
      console.log(`\n[WARNING] Threads ${threads} are too much. Force headless = true.\n`)
      headless = true
    }
  }
  setTraitBrowser(trait, headless)
  logManager.init(threads)
  
  //console.log(threads, mode)

  // -----------------------------

  if (!threads) {
    //console.log('aaa1')
    
    test(title, async function (args) {
      let browser = args.browser
      let page = await exposeFunction({headless, browser, url, logManager})
      
      let errors = []
      
      await excuteTest({config, args, page, errors, logManager})
      
      await handleException({errors, headless, logManager})
    }).timeout(0)
  }
  else if (!mode || mode === 'sequential') {
    //console.log('aaa2')
    for (let i = 0; i < threads; i++) {
      let t = `[${i}] ${title}`
      test(t, async function (args) {
        let index = i
        let browser = args.browser
        let page = await exposeFunction({headless, browser, url, index, logManager})
        
        let errors = []
        await excuteTest({config, args, page, errors, logManager})
        await handleException({errors, headless, index, logManager})
      }).timeout(0)
    }
  }
  else {
    //console.log('aaa3')
    test(title, async function (args) {
      let ary = []
      let browser = args.browser
      for (let i = 0; i < threads; i++) {
        ary.push(i)
      }
      
      let errors = []
      await Promise.all(ary.map(async (i) => {
        let index = i
        let page = await exposeFunction({headless, browser, url, index, logManager})
        
        let e = []
        await excuteTest({config, args, page, errors: e, index, logManager})
        if (e.length === 0) {
          setTimeout(() => {
            page.page.close()
          }, 3000)
        }
        else {
          errors = errors.concat(e)
        }
      }))
      
      await handleException({errors, headless, logManager})
    }).timeout(0)
  }
  
}

module.exports = TestBrowserHelper