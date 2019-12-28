const Sleep = use('Sleep')
const closeBlankPage = use('./closeBlankPage.js')

let exposeFunction = async function ({page, headless, index, logManager, webpageConfig, webpageGroup}) {
  
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

  await page.page.exposeFunction('PACORTestManagerPressEnter', async () => {
    await page.page.keyboard.press(String.fromCharCode(13));  
  })
  
  await page.page.exposeFunction('PACORTestManagerPressEsc', async () => {
    await page.page.keyboard.press(String.fromCharCode(27));  
  })
  
  await page.page.exposeFunction('PACORTestManagerWebpageConfig', async () => {
    return JSON.stringify(webpageConfig, null, 2)  
  })
  
  await page.page.exposeFunction('PACORTestManagerWebpageGroup', async () => {
    return webpageGroup  
  })

  await page.page.exposeFunction('PACORTestManagerIndex', () => {
    return index
  })
  
  await page.page.exposeFunction('PACORTestManagerName', () => {
    return logManager.getBasename(index)
  })
  
  await page.page.exposeFunction('PACORTestManagerAdminConfig', () => {
    //throw new Error('@underconstruction')
    //return logManager.getBasename(index)
    return {
      username: '布布',
      password: 'password'
    }
  })

  await page.page.exposeFunction('PACORTestManagerError', (message) => {
    return logManager.error(index, message)
  })
  
  await page.page.exposeFunction('PACORTestManagerTitlePrefix', (message) => {
    if (webpageConfig) {
      return '[ADMIN]'
    }
    else if (typeof(index) === 'number') {
      return index + ': '
    }
  })
  
  page.page.on('console', (message) => {
    logManager.log.apply(logManager, [index, message])
  })
  
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
}

module.exports = exposeFunction