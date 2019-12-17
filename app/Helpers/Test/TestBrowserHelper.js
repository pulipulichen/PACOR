/* global Promise */

'use strict'

const Env = use('Env')
let envHeadless = (Env.get('TEST_BROWSER_HEADLESS') === 'true')

const Sleep = use('Sleep')
const rimraf = use('rimraf')
const TestConfigHelper = use('App/Helpers/Test/TestConfigHelper')

let logs = {}


const exposeFunction = use('./TestBrowserHelper/exposeFunction.js')
const excuteTest = use('./TestBrowserHelper/excuteTest.js')
const handleException = use('./TestBrowserHelper/handleException.js')
const setTraitBrowser = use('./TestBrowserHelper/setTraitBrowser.js')
const setupWepbage = use('./TestBrowserHelper/setupWepbage.js')

// ---------------------------------

let TestBrowserHelper = function (title, url, config, options) {

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
      console.log(`Threads ${threads} are too much. Force headless = true.`)
      headless = true
    }
  }
  setTraitBrowser(trait, headless)

  //console.log(threads, mode)

  if (!threads) {
    //console.log('aaa1')
    
    test(title, async function (args) {
      let page = await exposeFunction(headless, args.browser, url)
      
      let errors = []
      
      await excuteTest(config, args, page, errors)
      
      await handleException(errors, headless)
    }).timeout(0)
  }
  else if (!mode || mode === 'sequential') {
    //console.log('aaa2')
    for (let i = 0; i < threads; i++) {
      let t = `[${i}] ${title}`
      test(t, async function (args) {
        let page = await exposeFunction(headless, args.browser, url, i)
        
        let errors = []
        await excuteTest(config, args, page, errors)
        await handleException(errors, headless, i)
      }).timeout(0)
    }
  }
  else {
    //console.log('aaa3')
    test(title, async function (args) {
      let ary = []
      for (let i = 0; i < threads; i++) {
        ary.push(i)
      }
      
      let errors = []
      await Promise.all(ary.map(async (i) => {
        let page = await exposeFunction(headless, args.browser, url, i)
        
        let e = []
        await excuteTest(config, args, page, e, i)
        if (e.length === 0) {
          setTimeout(() => {
            page.page.close()
          }, 3000)
        }
        else {
          errors = errors.concat(e)
        }
      }))
      
      await handleException(errors, headless)
    }).timeout(0)
  }
  
}

module.exports = TestBrowserHelper