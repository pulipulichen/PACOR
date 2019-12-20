let detectScreenSize = async function (browser) {
  await browser.launch({
    headless: false,
    defaultViewport: null,  // 這樣就不會限定視窗大小了
    args: [
      //'--app',
      //'--kiosk'
    ]
  })
  
  let page = await browser.visit('')
  
  let size = await page.page.evaluate(async () => {
    // use window.readfile to read contents of a file
    return {
      width: window.screen.availWidth,
      height: window.screen.availHeight,
    }
  })
  //console.log(w)
  await browser.close()
  
  return size
}

module.exports = detectScreenSize