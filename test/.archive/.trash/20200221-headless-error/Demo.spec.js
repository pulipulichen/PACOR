'use strict'

const { test, trait } = use('Test/Suite')('Hello World')

trait('Test/Browser', {
  //executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  headless: true,
  //timeout: 1000,
})

test('Visit home page', async ({ browser }) => {
  await browser.launch({
    timeout: 1000
  })
  
  console.log('AAA 1')
  //console.log(JSON.stringify(browser))
  //const page = await browser.newPage()
  for (let i = 0; i < 3; i++) {
    try {
      const page = await browser.visit('http://blog.pulipuli.info/')
      //console.log('AAA 1.5')
      //await page.goto('http://blog.pulipuli.info/')
      console.log('AAA 2')
      await page.assertHas('布丁布丁吃什麼')
    }
    catch (e) {
      console.log('error ' + i)
    }
    break
  }
 /*
  await browser.visit('/', {
    timeout: 3000
  })
  const page = await browser.visit('http://blog.pulipuli.info/')
  await page.assertHas('布丁布丁吃什麼')
  */
}).timeout(0)