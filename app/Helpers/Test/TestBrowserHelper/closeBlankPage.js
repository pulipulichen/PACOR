let closeBlankPage = async function (page) {
  //console.log(JSON.stringify(browser, null, 2))
  let puppeteerBrowser = await page.page.browser();
  let pages = await puppeteerBrowser.pages();
  let blankPage = pages[0]
  await blankPage.close()
}

module.exports = closeBlankPage