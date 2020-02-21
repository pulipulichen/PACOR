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
        '--no-sandbox'
        //'--app',
        //'--kiosk'
      ]
    }
    else {
      chromeArgs = [
        '--no-sandbox',
        `--window-size=${sizeOptions.width},${sizeOptions.height}`,
        `--window-position=${sizeOptions.left},${sizeOptions.top}`,
      ]
      //console.log(index, sizeOptions)
    }
    
    //if (index !== undefined) {
    //  chromeArgs.push('--user-data-dir=test/profiles/TestProfile_' + index + '_' + (new Date()).getTime())
    //}
    
    
    
    let defaultViewport = null
    if (headless === true) {
      chromeArgs = chromeArgs.concat([
      '--no-sandbox',
      '--allow-http-background-page',
      '--disable-background-timer-throttling',
      '--headless',
      '--no-zygote',
      //'--crash-test', // Causes the browser process to crash on startup, useful to see if we catch that correctly
      // not idea if those 2 aa options are usefull with disable gl thingy
      '--disable-canvas-aa', // Disable antialiasing on 2d canvas
      '--disable-2d-canvas-clip-aa', // Disable antialiasing on 2d canvas clips
      '--disable-gl-drawing-for-tests', // BEST OPTION EVER! Disables GL drawing operations which produce pixel output. With this the GL output will not be correct but tests will run faster.
      '--disable-dev-shm-usage', // ???
      '--no-zygote', // wtf does that mean ?
      '--use-gl=swiftshader', // better cpu usage with --use-gl=desktop rather than --use-gl=swiftshader, still needs more testing.
      '--enable-webgl',
      '--hide-scrollbars',
      '--mute-audio',
      '--no-first-run',
      '--disable-infobars',
      '--disable-breakpad',
      //'--ignore-gpu-blacklist',
      '--window-size=1280,1024', // see defaultViewport
      '--user-data-dir=./chromeData', // created in index.js, guess cache folder ends up inside too.
      '--no-sandbox', // meh but better resource comsuption
      '--disable-setuid-sandbox',
      "--proxy-server='direct://'", 
      '--proxy-bypass-list=*'
    ])
      
      displayDevTools = false
      defaultViewport = {width: 1280, height: 882}
    }
    
    // 畫面大小是800 x 600
    await browser.launch({
      headless: false,
      //dumpio: true,  // Log all browser console messages to the terminal.
      devtools: displayDevTools,
      //pipe: true,
      defaultViewport: defaultViewport,  // 這樣就不會限定視窗大小了

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
      page = await browser.visit(url, () => {}, {
        timeout: 0
      })
      
//      page = await browser.visit(url, {
//        waitUntil: 'load'
//      })
      
      if (headless === false) {
        await closeBlankPage(page)
      }
      //console.log('visit ok', url)
      break
    }
    catch (e) {
      
      if (i < visitRetryLimit - 1) {
        console.log(`[${index}] browser.visit() failed (${i}): ${url}`)
        console.error(e)
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