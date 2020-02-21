'use strict'

const { test, trait } = use('Test/Suite')('Hello World')

trait('Test/Browser', {
  //headless: false
})

test('Visit home page', async ({ browser }) => {
  console.log('AAA 1')
  const page = await browser.visit('http://blog.pulipuli.info/')
  console.log('AAA 2')
  await page.assertHas('布丁布丁吃什麼')
}).timeout(0)