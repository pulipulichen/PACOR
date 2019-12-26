const Sleep = use('Sleep')
const closeBlankPage = use('./closeBlankPage.js')

const exposeFunction = use('./exposeFunction.js')

let initPage = async function ({headless, browser, url, index, logManager, displayDevTools, sizeOptions}) {
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
    })
  //}
  
  // 等待非同步工作完成
  if (!index && index > 0) {
    await Sleep(index * 4)
  }
  
  //if (!sizeOptions) {
    page = await browser.visit(url)
    await closeBlankPage(page)
  //}
  //else {
  //  page = 
  //}

  
  
  // -------------------------------------------

  //const session = await page.page.target().createCDPSession();
  //await session.send('Page.enable');
  //await session.send('Page.setWebLifecycleState', {state: 'active'});
  
  await exposeFunction({page, headless, index, logManager})

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

module.exports = initPage