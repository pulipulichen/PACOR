/* global Promise */

'use strict'

const Env = use('Env')
let envHeadless = (Env.get('TEST_BROWSER_HEADLESS') === 'true')

const Sleep = use('Sleep')

let exposeFunction = async function (browser, url, index) {
  let page = await browser.visit(url)

  //console.log(JSON.stringify(browser, null, 2))
  let puppeteerBrowser = await page.page.browser();
  let pages = await puppeteerBrowser.pages();
  await pages[0].close()

  //const session = await page.page.target().createCDPSession();
  //await session.send('Page.enable');
  //await session.send('Page.setWebLifecycleState', {state: 'active'});

  let consolePrefix
  if (index === undefined) {
    consolePrefix = '[CONSOLE]'
  }
  else {
    consolePrefix = `[${index}: CONSOLE]`
  }

  await page.page.exposeFunction('PACORTestManagerIndex', () => {
    return index
  })

  await page.page.exposeFunction('PACORTestManagerLog', (...args) => {
    args.unshift(consolePrefix)
    console.log.apply(this, args)
  })

  await page.page.exposeFunction('PACORTestManagerInteractions', async function (method, selector, ...args) {
    //await page.type(selector, text)
    args.unshift(selector)
    await page[method].apply(this, args)
  })
  
  // 等待非同步工作完成
  if (!index && index > 0) {
    await Sleep(index * 2)
  }

  await page.assertFn(async () => {
    let index = await PACORTestManagerIndex()
    if (index !== undefined) {
      document.title = index + ': ' + document.title
    }
    window.focus()
    
    setTimeout(() => {
      window.focus()
    }, 5000)
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
      return  // 後面不繼續了，反正也就卡死了
      //throw e
    }
  }
}

let handleException = async function (errors, headless, index) {
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
    mode,  // sequential, parallel
    headless
  } = options

  const { test, trait } = use('Test/Suite')(title)

  trait('Test/ApiClient')
  trait('Session/Client')
  
  if (headless === undefined) {
    headless = envHeadless
  }
  
  /**
   * https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
   */
  trait('Test/Browser', {
    headless,
    //dumpio: true,  // Log all browser console messages to the terminal.
    devtools: true,
    //pipe: true,
    
    // https://peter.sh/experiments/chromium-command-line-switches/
    args: [
      '--start-maximized'
      //'--start-minimized'
      , '--auto-open-devtools-for-tabs']
  })

  //console.log(threads, mode)

  if (!threads) {
    //console.log('aaa1')
    test(title, async function (args) {
      let page = await exposeFunction(args.browser, url)
      
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
        let page = await exposeFunction(args.browser, url, i)
        
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
        let page = await exposeFunction(args.browser, url, i)
        await excuteTest(config, args, page, errors, i)
      }))
      
      await handleException(errors, headless)
      
    }).timeout(0)
  }
  
}

module.exports = TestBrowserHelper