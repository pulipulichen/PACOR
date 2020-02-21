let setTraitBrowser = function (trait, headless) {
  
  console.log({headless})
  
  /**
   * https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
   */
  trait('Test/Browser', {
    headless, // 這邊似乎是沒用的，會被後面覆蓋過去
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


module.exports = setTraitBrowser