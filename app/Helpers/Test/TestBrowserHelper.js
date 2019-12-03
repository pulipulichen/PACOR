/* global Promise */

'use strict'

const Env = use('Env')

let exposeFunction = async function (browser, url, index) {
  let page = await browser.visit(url)

  let consolePrefix
  if (!index) {
    consolePrefix = '[CONSOLE]'
  }
  else {
    consolePrefix = `[CONSOLE: ${index}]`
  }

  await page.page.exposeFunction('PACORTestManagerLog', (...args) => {
    args.unshift(consolePrefix)
    console.log.apply(this, args)
  })

  await page.page.exposeFunction('PACORTestManagerTypeInput', async (selector, text) => {
    await page.type(selector, text)
  })

  await page.assertFn(async () => {
    window.focus()
  })
  
  return page
}

let excuteTest = async function (config, args, page, index) {
  let errors = []

  for (let name in config) {
    try {
      let consolePrefix = '[RUNNING] '
      if (index !== undefined) {
        consolePrefix = `[RUNNING: ${index}] `
      }
      console.log(consolePrefix + name)
      await config[name](args, page)
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
    headless: (Env.get('TEST_BROWSER_HEADLESS') === 'true'),
    //dumpio: true,  // Log all browser console messages to the terminal.
    devtools: true,
    //pipe: true,
    args: ['--start-maximized', '--auto-open-devtools-for-tabs']
  })

  console.log(threads, mode)

  if (!threads) {
    console.log('aaa1')
    test(title, async function (args) {
      let page = await exposeFunction(args.browser, url)
      await excuteTest(config, args, page)
    }).timeout(0)
  }
  else if (!mode || mode === 'sequential') {
    console.log('aaa2')
    for (let i = 0; i < threads; i++) {
      let t = `[${i}] ${title}`
      test(t, async function (args) {
        let page = await exposeFunction(args.browser, url)
        await excuteTest(config, args, page)
      }).timeout(0)
    }
  }
  else {
    console.log('aaa3')
    test(title, async function (args) {
      let ary = []
      for (let i = 0; i < threads; i++) {
        ary.push(i)
      }
      
      await Promise.all(ary.map(async (i) => {
        // 等待非同步工作完成
        let page = await exposeFunction(args.browser, url, i)
        await excuteTest(config, args, page, i)
      }))
    }).timeout(0)
  }
  
}

module.exports = TestBrowserHelper