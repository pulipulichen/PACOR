const Env = use('Env')
const Sleep = use('Sleep')

let setupWepbage = async function (headless, args) {
  console.log('...不行，我們要改從')
  
  let page = await exposeFunction(headless, args.browser, `http://127.0.0.1:${Env.get('PORT')}/admin`)
  
  await page.type('#loginUsername', Env.get('ADMIN_USERNAME'))
  await page.type('#loginPassword', Env.get('ADMIN_PASSWORD'))
  await page.click('.login-submit')
  
  await Sleep(3)
  
  
}

module.exports = setupWepbage