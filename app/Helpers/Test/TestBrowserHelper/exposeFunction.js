const Sleep = use('Sleep')
const closeBlankPage = use('./closeBlankPage.js')

let exposeFunction = async function ({headless, browser, url, index, logManager, displayDevTools}) {
  //if (headless === false) {
    let chromeArgs = [
      '--start-maximized',
      //`--window-size=640,480`
    ]
    
    //if (index !== undefined) {
    //  chromeArgs.push('--user-data-dir=test/profiles/TestProfile_' + index + '_' + (new Date()).getTime())
    //}
    
    // 畫面大小是800 x 600

    await browser.launch({
      headless,
      //dumpio: true,  // Log all browser console messages to the terminal.
      devtools: displayDevTools,
      //pipe: true,
      defaultViewport: null,  // 這樣就不會限定視窗大小了

      // https://peter.sh/experiments/chromium-command-line-switches/
      args: chromeArgs,
      ignoreHTTPSErrors: true,
    })
  //}
  
  // 等待非同步工作完成
  if (!index && index > 0) {
    await Sleep(index * 4)
  }
  
  let page = await browser.visit(url)

  await closeBlankPage(page)
  
  // -------------------------------------------

  //const session = await page.page.target().createCDPSession();
  //await session.send('Page.enable');
  //await session.send('Page.setWebLifecycleState', {state: 'active'});

  let consolePrefix
  let errorPrefix
  if (index === undefined) {
    consolePrefix = '[CONSOLE]'
    errorPrefix = '[ERROR]'
  }
  else {
    consolePrefix = `[${index}: CONSOLE]`
    errorPrefix = `[${index}: ERROR]`
  }
  
  // --------------------------------------

  await page.page.exposeFunction('PACORTestManagerIndex', () => {
    return index
  })
  
  await page.page.exposeFunction('PACORTestManagerName', () => {
    return logManager.getBasename(index)
  })

  await page.page.exposeFunction('PACORTestManagerLog', (...args) => {
    //args.unshift(consolePrefix)
    //console.log.apply(this, args)
    //args.unshift(index)
    //logManager.log.apply(logManager, args)
  })
  
  await page.page.exposeFunction('PACORTestManagerError', (message) => {
    return logManager.error(index, message)
  })
  
  page.page.on('console', (message) => {
    /*
    if (error._type === 'error'
            && error._args
            && error._args[0]
            && error._args[0]._remoteObject) {
      let description = error._args[0]._remoteObject
      if (typeof(description) === 'object' && description.description) {
        description = description.description
      }
      if (typeof(description) === 'string' && description.indexOf('\n') > -1) {
        description = description.slice(0, description.indexOf('\n')).trim()
      }
      //throw consolePrefix + ' ' + description
      console.error(errorPrefix, description)
    }
    */
    //args.unshift(index)
    
    //console.log(JSON.stringify(error, null, 2))
    
    //console.log('log', message)
    logManager.log.apply(logManager, [index, message])
  })
  
//  page.page.on('error', (message) => {
//    console.log('error', message)
//    //logManager.log.apply(logManager, [index, message])
//  })
//  
//  page.page.on('pageerror', (message) => {
//    console.log('pageerror', message)
//    //logManager.log.apply(logManager, [index, message])
//  })
  
  await page.page.exposeFunction('PACORTestManagerInteractions', async function (method, selector, ...args) {
    //await page.type(selector, text)
    args.unshift(selector)
    await page[method].apply(this, args)
  })
  
  await page.page.exposeFunction('PACORTestManagerDisplayIndex', async function (method, selector, ...args) {
    if (headless === true) {
      return null
    }
    return logManager.getDisplayIndex(index)
  })

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

module.exports = exposeFunction