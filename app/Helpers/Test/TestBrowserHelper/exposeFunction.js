const Sleep = use('Sleep')
const closeBlankPage = use('./closeBlankPage.js')

let exposeFunction = async function ({page, headless, index, logManager}) {
  
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