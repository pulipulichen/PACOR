/* global Promise */

'use strict'

const Env = use('Env')
let headless = (Env.get('TEST_BROWSER_HEADLESS') === 'true')

const Sleep = use('Sleep')

let exposeFunction = async function (browser, url, index) {
  let page = await browser.visit(url)

  let consolePrefix
  if (!index) {
    consolePrefix = '[CONSOLE]'
  }
  else {
    consolePrefix = `[${index}: CONSOLE]`
  }

  await page.page.exposeFunction('PACORTestManagerLog', (...args) => {
    args.unshift(consolePrefix)
    console.log.apply(this, args)
  })

  await page.page.exposeFunction('PACORTestManagerInteractions', async function (method, selector, ...args) {
    //await page.type(selector, text)
    args.unshift(selector)
    await page[method].apply(this, args)
  })

  await page.assertFn(async () => {
    window.focus()
  })
  
  return page
}

let excuteTest = async function (config, args, page, errors, index) {
  

  for (let name in config) {
    try {
      let consolePrefix = '[RUNNING] '
      if (index !== undefined) {
        consolePrefix = `[${index}: RUNNING] `
      }
      console.log(consolePrefix + name)
      await config[name](args, page)
    }
    catch (e) {
      let consolePrefix = `[${name}]`
      if (index !== undefined) {
        consolePrefix = `[${index}: ${name}] `
      }
      console.log(consolePrefix, e)
      errors.push(consolePrefix + ' ' + e.message)
      //throw e
    }
  }
}

let handleException = async function (errors, index) {
  if (errors.length > 0) {
    if (headless === false) {
      let prefix = `[ERROR]`
      if (index !== undefined) {
        prefix = `[${index}: ERROR]`
      }
      console.log(prefix, '\n\n' + errors.join('\n') + '\n')
      await Sleep(3 * 60) // 暫停3分鐘
      throw new Error('')
    }
    else {
      throw new Error('\n\n' + errors.join('\n') + '\n')
    }
  }
}

let TestBrowserHelper = function (title, url, config, options) {

  let {
    threads,
    mode  // sequential, parallel
  } = options

  const { test, trait } = use('Test/Suite')(title)

  trait('Test/ApiClient')
  trait('Session/Client')
  
  /**
   * https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
   */
  trait('Test/Browser', {
    headless,
    //dumpio: true,  // Log all browser console messages to the terminal.
    devtools: true,
    //pipe: true,
    args: ['--start-maximized', '--auto-open-devtools-for-tabs']
  })

  //console.log(threads, mode)

  if (!threads) {
    //console.log('aaa1')
    test(title, async function (args) {
      let page = await exposeFunction(args.browser, url)
      
      let errors = []
      
      await excuteTest(config, args, page, errors)
      
      await handleException(errors)
    }).timeout(0)
  }
  else if (!mode || mode === 'sequential') {
    //console.log('aaa2')
    for (let i = 0; i < threads; i++) {
      let t = `[${i}] ${title}`
      test(t, async function (args) {
        let page = await exposeFunction(args.browser, url, i)
        
        let errors = []
        await excuteTest(config, args, page, errors)
        await handleException(errors, i)
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
        // 等待非同步工作完成
        let page = await exposeFunction(args.browser, url, i)
        await excuteTest(config, args, page, errors, i)
      }))
      
      await handleException(errors)
      
    }).timeout(0)
  }
  
}

module.exports = TestBrowserHelper