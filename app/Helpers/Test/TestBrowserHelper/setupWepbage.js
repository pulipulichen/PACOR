const Env = use('Env')
const Sleep = use('Sleep')

const initPage = use('./initPage.js')

let setupWepbage = async function ({headless, args, webpageConfig, webpageGroup, logManager, displayDevTools, url}) {
  //console.log('...不行，我們要改從')
  
  let page = await initPage({
    headless,
    browser: args.browser,
    url,
    logManager, displayDevTools,
    webpageConfig, webpageGroup
  })
  
  //await Sleep(3)
  try {
    await page.assertFn(async () => {
      await PACORTestManager.adminLogin()
      await PACORTestManager.adminPanel()
    })
  }
  catch (e) {
    console.log('[ERROR]', e)
    await Sleep(300 * 1000)
  } 
  
//  await page.type('#loginUsername', Env.get('ADMIN_USERNAME'))
//  await page.type('#loginPassword', Env.get('ADMIN_PASSWORD'))
//  await page.click('.login-submit')
  
  await Sleep(300 * 1000)
  
}

module.exports = setupWepbage