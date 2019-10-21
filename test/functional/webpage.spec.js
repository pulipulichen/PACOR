'use strict'

const { test } = use('Test/Suite')('Domain')

const WebpageModel = use('App/Models/Webpage')

test('findByURL have an domain', async ({ assert }) => {
  let webpage = await WebpageModel.findByURL('http://blog.pulipuli.info')
  
  assert.equal(webpage.id, 2)
})
