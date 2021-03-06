/* global Promise */

'use strict'

const Env = use('Env')
let envHeadless = (Env.get('TEST_BROWSER_HEADLESS') === 'true')

const Sleep = use('Sleep')
const rimraf = use('rimraf')

const TestConfigHelper = use('App/Helpers/Test/TestBrowserHelper/TestConfigHelper.js')

const initPage = use('App/Helpers/Test/TestBrowserHelper/initPage.js')
const excuteTest = use('App/Helpers/Test/TestBrowserHelper/excuteTest.js')
const handleException = use('App/Helpers/Test/TestBrowserHelper/handleException.js')
const setTraitBrowser = use('App/Helpers/Test/TestBrowserHelper/setTraitBrowser.js')
const setupWepbage = use('App/Helpers/Test/TestBrowserHelper/setupWepbage.js')
const detectScreenSize = use('App/Helpers/Test/TestBrowserHelper/detectScreenSize.js')

const setupManualReader = use('App/Helpers/Test/TestBrowserHelper/setupManualReader.js')

// ---------------------------------

let TestBrowserHelper = function (title, url, config, options) {
  
  let logManager = use('App/Helpers/Test/TestBrowserHelper/logManager.js')

  let {
    threads,
    maxShowThreads = 9,
    mode,  // sequential, parallel
    headless,
    stopAt,
    displayDevTools = false,
    webpageConfig,
    groupSize,
    manualReader = false,
    manualAdmin = false
  } = options
  
  const { test, trait } = use('Test/Suite')(title)
  let optionsHeadless = headless

  if (stopAt) {
    config = TestConfigHelper(config, stopAt)
  }

  trait('Test/ApiClient')
  trait('Session/Client')
  
  let forceShowIndexes = []
  
  if (headless === undefined) {
    headless = envHeadless
  }
  
  if (threads > maxShowThreads) {
    process.setMaxListeners(0)

    if (headless === false) {
      
      // 來決定那些要顯示的吧
      let interval = Math.floor(threads / maxShowThreads)
      if (interval < 1) {
        interval = 1
      }
      
      for (let i = 0; i < threads; i++) {
        if (i % interval !== 0) {
          continue
        }
        forceShowIndexes.push(i)
        
        if (forceShowIndexes.length === maxShowThreads) {
          break
        }
      }
      
      console.log(`\n[WARNING] Threads ${threads} are too much. Force ${forceShowIndexes.join(', ')}'s headless = false.\n`)
      headless = true
    }
  }
  
  if (threads === 1) {
    displayDevTools = true
    console.log('Force enable dev tools in 1 thread test')
  }
  
  setTraitBrowser(trait, true)
  logManager.init(threads)
  let webpageGroup
  if (typeof(groupSize) === 'number') {
    webpageGroup = logManager.buildWebpageGroup(groupSize)
    console.log('Webpage Group:')
    console.log(webpageGroup + '\n')
  }
  //return
  
  
  //console.log(webpageGroup)
  //return
  //console.log(threads, mode)

  // -----------------------------

  if (!threads || threads === 1) {
    //console.log('aaa1')
    
    test(title, async function (args) {
      
      if (webpageConfig || webpageGroup) {
        await setupWepbage({headless: false, args, webpageConfig, url, logManager, displayDevTools: true, webpageGroup, manualAdmin})
        //return false
      }
      
      let browser = args.browser
      
      let errors = []
      let page = await initPage({headless, browser, url, logManager, displayDevTools, errors})
      if (page) {
        await excuteTest({config, args, page, errors, logManager})

        //if (e.length === 0) {
        if (logManager.isError() === false) {
          if (page.page.isClosed() === false) {
            setTimeout(() => {
              if (page.page.isClosed() === false) {
                try {
                  page.page.close()
                }
                catch (e) {}
              }
            }, 3000)
          }
        }
      }
      console.log(errors)
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
        
        if (index === 0 && (webpageConfig || webpageGroup)) {
          await setupWepbage({headless: false, args, webpageConfig, url, logManager, displayDevTools: true, webpageGroup, manualAdmin})
          //return false
        }
        if (index === 0 && manualReader === true) {
          await setupManualReader({headless: false, args, url, logManager, displayDevTools: true})
        }
        
        let h = headless
        if (forceShowIndexes.indexOf(i) > -1) {
          h = false
        }
        
        let errors = []
        let finalHeadless = headless
        let page = await initPage({headless: h, browser, url, index, logManager, displayDevTools, errors})
        if (page) {
          await excuteTest({config, args, page, errors, logManager})

          if (forceShowIndexes.length > 0) {
            finalHeadless = false
          }
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
      
      if (webpageConfig || webpageGroup) {
        await setupWepbage({headless: false, args, webpageConfig, url, logManager, displayDevTools: true, webpageGroup, manualAdmin})
        //return false
      }
      
      // 偵測尺寸
      let screenSize
      if (optionsHeadless === false) {
        screenSize = await detectScreenSize(browser)
      }
      
      let errors = []
      await Promise.all(ary.map(async (i) => {
        let index = i
        
        let h = headless
        let sizeOptions
        let posIndex = index
        if (forceShowIndexes.length > 0) {
          posIndex = forceShowIndexes.indexOf(index)
        }
        if (posIndex > -1) {
          h = false
        }
        if (h === false) {
          sizeOptions = logManager.getSizeOptions(posIndex, screenSize)
        }
        //console.log(posIndex, forceShowIndexes, forceShowIndexes.indexOf(index), sizeOptions)
        //return
        
        let page
        
        let e = []
        if (manualReader === true && i === 0) {
          page = await setupManualReader({headless: false, args, url, logManager, displayDevTools: true})
        }
        else {
          page = await initPage({headless: h, browser, url, index, logManager, displayDevTools, sizeOptions, errors: e})
          if (page) {
            await excuteTest({config, args, page, errors: e, index, logManager})
          }
        }
        
        //if (e.length === 0) {
        if (logManager.isError(index) === false) {
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