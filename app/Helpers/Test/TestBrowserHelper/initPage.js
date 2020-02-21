const Sleep = use('Sleep')
const closeBlankPage = use('./closeBlankPage.js')

const exposeFunction = use('./exposeFunction.js')

const puppeteer = use('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

let initPage = async function ({headless, browser, url, index, logManager, displayDevTools, sizeOptions, webpageGroup, webpageConfig, errors}) {
  
  // 等待非同步工作完成
  if (typeof(index) === 'number' && index > 0) {
    // 每個視窗開啟間隔時間
    await Sleep(index * 2)
  }
  
  //if (headless === false) {
  let page
  
    let chromeArgs = [
      //'--start-maximized',
//      `--window-size=640,480`,
//      `--window-position=640,480`
    ]
    
    if (!sizeOptions) {
      chromeArgs = [
        '--start-maximized',
        //'--app',
        //'--kiosk'
      ]
    }
    else {
      chromeArgs = [
        `--window-size=${sizeOptions.width},${sizeOptions.height}`,
        `--window-position=${sizeOptions.left},${sizeOptions.top}`,
      ]
      //console.log(index, sizeOptions)
    }
    
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
      timeout: 0,
    })
  //}
  
  
  //if (!sizeOptions) {
  let visitRetryLimit = 10
  for (let i = 0; i < visitRetryLimit; i++) {
    try {
      page = await browser.visit(url)
      if (headless === false) {
        await closeBlankPage(page)
      }
      //console.log('visit ok', url)
      break
    }
    catch (e) {
      
      if (i < visitRetryLimit - 1) {
        console.log(`[${index}] browser.visit() failed (${i}): ${url}`)
      }
      else {
        let name = 'browser.visit(): ' + headless
        let consolePrefix = `[${name}]`
        if (index !== undefined) {
          consolePrefix = `[${index}: ${name}] `
        }
        //console.log(consolePrefix, e)
        logManager.error(index, e)

        errors.push(consolePrefix + ' ' + e.message)
        console.trace(e)
        return undefined
      }
    }
  } // for (let i = 0; i < 3; i++) {
  //}
  //else {
  //  page = 
  //}

  
  
  // -------------------------------------------

  //const session = await page.page.target().createCDPSession();
  //await session.send('Page.enable');
  //await session.send('Page.setWebLifecycleState', {state: 'active'});
  
  await exposeFunction({page, headless, index, logManager, webpageGroup, webpageConfig})

  //await page.page.emulate(iPhone);

  await page.assertFn(async () => {
    let index = await PACORTestManagerIndex()
    //if (index !== undefined) {
    //  document.title = index + ': ' + document.title
    //}
    window.focus()
    
    setTimeout(() => {
      window.focus()
    }, 5000)
  })
  
  
  return page
}

module.exports = initPage