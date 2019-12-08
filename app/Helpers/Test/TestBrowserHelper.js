/* global Promise */

'use strict'

const Env = use('Env')
let envHeadless = (Env.get('TEST_BROWSER_HEADLESS') === 'true')

const Sleep = use('Sleep')
const rimraf = use('rimraf')
const TestConfigHelper = use('App/Helpers/Test/TestConfigHelper')

let closeBlankPage = async function (page) {
  //console.log(JSON.stringify(browser, null, 2))
  let puppeteerBrowser = await page.page.browser();
  let pages = await puppeteerBrowser.pages();
  await pages[0].close()
}

let exposeFunction = async function (headless, browser, url, index) {
  if (headless === false) {
    let chromeArgs = [
      '--start-maximized'
    ]
    //if (index !== undefined) {
    //  chromeArgs.push('--user-data-dir=test/profiles/TestProfile_' + index + '_' + (new Date()).getTime())
    //}

    await browser.launch({
      headless,
      //dumpio: true,  // Log all browser console messages to the terminal.
      devtools: true,
      //pipe: true,

      // https://peter.sh/experiments/chromium-command-line-switches/
      args: chromeArgs
    })
  }
  let page = await browser.visit(url)

  await closeBlankPage(page)

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
      
      let time = 8 * 60 * 60
      console.log(`Wait ${time} seconds for debug...`)
      await Sleep(time) // 暫停30分鐘
      throw new Error('')
    }
    else {
      throw new Error('\n\n' + errors.join('\n') + '\n')
    }
  }
}

let setTraitBrowser = function (trait, headless) {
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
      , '--auto-open-devtools-for-tabs'
      //, '--incognito'
    ]
  })
}

let setupWepbage = async function (headless, args) {
  console.log('...不行，我們要改從')
  
  let page = await exposeFunction(headless, args.browser, `http://127.0.0.1:${Env.get('PORT')}/admin`)
  
  await page.type('#loginUsername', Env.get('ADMIN_USERNAME'))
  await page.type('#loginPassword', Env.get('ADMIN_PASSWORD'))
  await page.click('.login-submit')
  
  await Sleep(3)
  
  
}

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