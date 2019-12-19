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
    maxHeadlessThreads = 10,
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
  
  let forceShowIndexes = []
  
  if (headless === undefined) {
    headless = envHeadless
  }
  
  if (threads > maxHeadlessThreads) {
    process.setMaxListeners(0)

    if (headless === false) {
      
      // 來決定那些要顯示的吧
      let interval = Math.ceil(threads / maxHeadlessThreads)
      for (let i = 0; i < threads; i++) {
        if (i % interval !== 0) {
          continue
        }
        forceShowIndexes.push(i)
      }
      
      console.log(`\n[WARNING] Threads ${threads} are too much. Force ${forceShowIndexes.join(', ')}'s headless = true.\n`)
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
        
        let h = headless
        if (forceShowIndexes.indexOf(i) > -1) {
          h = false
        }
        let page = await exposeFunction({headless: h, browser, url, index, logManager})
        
        let errors = []
        await excuteTest({config, args, page, errors, logManager})
        
        let finalHeadless = headless
        if (forceShowIndexes.length > 0) {
          finalHeadless = false
        }
        await handleException({errors, headless: finalHeadless, index, logManager})
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
        
        let h = headless
        if (forceShowIndexes.indexOf(i) > -1) {
          h = false
        }
        let page = await exposeFunction({headless: h, browser, url, index, logManager})
        
        let e = []
        await excuteTest({config, args, page, errors: e, index, logManager})
        if (e.length === 0) {
          if (page.page.isClosed() === false) {
            setTimeout(() => {
              if (page.page.isClosed() === false) {
                page.page.close()
              }
            }, 3000)
          }
        }
        else {
          errors = errors.concat(e)
        }
      }))
      
      let finalHeadless = headless
      if (forceShowIndexes.length > 0) {
        finalHeadless = false
      }
      await handleException({errors, headless: finalHeadless, logManager})
    }).timeout(0)
  }
  
}

module.exports = TestBrowserHelper