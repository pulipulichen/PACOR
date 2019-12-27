const Env = use('Env')
const Sleep = use('Sleep')

const initPage = use('./initPage.js')

let setupManualReader = async function ({headless, args, webpageConfig, webpageGroup, logManager, displayDevTools, url}) {
  //console.log('...不行，我們要改從')
  
  let page = await initPage({
    headless,
    browser: args.browser,
    url,
    logManager, displayDevTools,
    webpageConfig, webpageGroup
  })
  
  await page.assertFn(async () => {
    document.title = '[!] ' + document.title
  })
  
  //await Sleep(3)
  try {
    await page.assertFn(async () => {
      await PACORTestManager.login()
      await PACORTestManager.writeQuestionnaire()
      await PACORTestManager.confirmInstructionMessage()
      await PACORTestManager.completeChecklists()
      await PACORTestManager.confirmInstructionMessage()
    })
    
    await Sleep(30 * 60 * 1000)
    
    if (page.page.isClosed() === false) {
      setTimeout(() => {
        if (page.page.isClosed() === false) {
          page.page.close()
        }
      }, 3000)
    }
  }
  catch (e) {
    console.log('[ERROR]', e)
    await Sleep(300 * 1000)
  } 
  
  return page
//  await page.type('#loginUsername', Env.get('ADMIN_USERNAME'))
//  await page.type('#loginPassword', Env.get('ADMIN_PASSWORD'))
//  await page.click('.login-submit')
  
  //await Sleep(300 * 1000)
  
}

module.exports = setupManualReader