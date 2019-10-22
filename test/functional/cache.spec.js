'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('Cache')

const WebpageModel = use('App/Models/Webpage')

test('how to use cache?', async ({ assert }) => {
  let webpage = await WebpageModel.findByURL('http://blog.pulipuli.info')
  assert.isNumber(webpage.id)
})

// Reset database
//trait('DatabaseTransactions')