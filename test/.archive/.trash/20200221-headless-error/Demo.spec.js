'use strict'

const { test, trait } = use('Test/Suite')('Hello World')

trait('Test/Browser', {
  //executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  headless: true,
  timeout: 0,
  args: [
      '--start-maximized'
      //'--start-minimized'
      , '--auto-open-devtools-for-tabs'
      //, '--incognito'
    ]
})

test('Visit home page', async ({ browser }) => {
  await browser.launch({
    timeout: 0
  })
  
  //console.log('AAA 1')
  //console.log(JSON.stringify(browser))
  //const page = await browser.newPage()
  for (let i = 0; i < 3; i++) {
    try {
      //const page = await browser.visit('http://pc.pulipuli.info:4000')
      //const page = await browser.visit('http://192.168.0.120:4000/')
      
      //const page = await browser.visit('http://pc.pulipuli.info/')
      //await page.assertHas('Work')
      
      //const page = await browser.visit('http://blog.pulipuli.info')
      //await page.assertHas('布丁布丁吃什麼')
      
      const page = await browser.visit('https://github.com/pulipulichen/PACOR/issues/334')
      await page.assertHas('背景執行的網頁似乎會出現錯誤，為什麼呢')
      
      //console.log('AAA 1.5')
      //await page.goto('http://blog.pulipuli.info/')
      //console.log('AAA 2')
      console.log('test passed')
      break
    }
    catch (e) {
      console.log('error ' + i, e)
    }
  }
 /*
  await browser.visit('/', {
    timeout: 3000
  })
  const page = await browser.visit('http://blog.pulipuli.info/')
  await page.assertHas('布丁布丁吃什麼')
  */
}).timeout(0)