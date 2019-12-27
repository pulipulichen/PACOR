const Env = use('Env')
const Sleep = use('Sleep')

const initPage = use('./initPage.js')

let setupWepbage = async function ({headless, args, webpageConfig, webpageGroup, logManager, displayDevTools, url, manualAdmin = false}) {
  //console.log('...不行，我們要改從')
  
  let page = await initPage({
    headless,
    browser: args.browser,
    url,
    logManager, displayDevTools,
    webpageConfig, webpageGroup
  })
  
  await page.assertFn(async () => {
    document.title = '[ADMIN] ' + document.title
  })
  
  //await Sleep(3)
  try {
    await page.assertFn(async () => {
      await PACORTestManager.adminLogin()
      await PACORTestManager.adminPanel()
    })
    
    if (manualAdmin === false && page.page.isClosed() === false) {
      setTimeout(() => {
        if (page.page.isClosed() === false) {
          page.page.close()
        }
      }, 3000)
    }
    
    if (manualAdmin === true) {
      await page.assertFn(async () => {
        location.reload()
        //await PACORTestManager.sleep(30 * 60 * 1000)
      })
      await Sleep(3)
      await page.assertFn(async () => {
        document.title = '[ADMIN] ' + document.title
      })
    }
  }
  catch (e) {
    console.log('[ERROR]', e)
    await Sleep(300)
  } 
  
//  await page.type('#loginUsername', Env.get('ADMIN_USERNAME'))
//  await page.type('#loginPassword', Env.get('ADMIN_PASSWORD'))
//  await page.click('.login-submit')
  
  //await Sleep(300 * 1000)
  
}

module.exports = setupWepbage