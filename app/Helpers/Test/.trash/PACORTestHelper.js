'use strict'

let PACORTestHelper = async function (page, callback) {
  
  await page.page.exposeFunction('PACORTestHelperCallback', PACORTestManager => {
    console.log(PACORTestManager)
  })
  
  //console.log('callback 1', typeof(callback))
  return await page.page.evaluate(() => {
    //console.log('callback 2', typeof(callback))
    return PACORTestHelperCallback(window.PACORTestManager)
  })
}

module.exports = PACORTestHelper