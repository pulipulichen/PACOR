'use strict'

const Env = use('Env')

let TestBrowserHelper = function (title, url, config) {

  const { test, trait } = use('Test/Suite')(title)

  trait('Test/ApiClient')
  trait('Session/Client')
  
  /**
   * https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
   */
  trait('Test/Browser', {
    headless: (Env.get('TEST_BROWSER_HEADLESS') === 'true'),
    dumpio: true,  // Log all browser console messages to the terminal.
    devtools: true,
    pipe: true,
    args: ['--start-maximized', '--auto-open-devtools-for-tabs']
  })

  let errors = []

  test(title, async function (args) {
    
    let page = await args.browser.visit(url)
    
    await page.page.exposeFunction('PACORTestManagerLog', (...args) => {
      args.unshift('[CONSOLE]')
      console.log.apply(this, args)
    })
    
    await page.page.exposeFunction('PACORTestManagerTypeInput', async (selector, text) => {
      await page.type(selector, text)
    })
    
    await page.assertFn(async () => {
      window.focus()
    })
    
    args.page = page
    
    for (let name in config) {
      try {
        console.log('[RUNNING] ' + name)
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