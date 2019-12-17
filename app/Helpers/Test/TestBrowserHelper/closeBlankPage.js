let closeBlankPage = async function (page) {
  //console.log(JSON.stringify(browser, null, 2))
  let puppeteerBrowser = await page.page.browser();
  let pages = await puppeteerBrowser.pages();
  await pages[0].close()
}

module.exports = closeBlankPage