'use strict'

const { test, trait } = use('Test/Suite')('Webpage 1')

const WebpageModel = use('App/Models/Webpage')

test('findByURL have an domain', async ({ assert }) => {
  let webpage = await WebpageModel.findByURL('http://blog.pulipuli.info')
  
  assert.equal(webpage.id, 1)
  assert.equal(webpage.url, 'http://blog.pulipuli.info')
  
  let doamin = await webpage.domain().fetch()
  assert.equal(doamin.id, 1)
  assert.equal(doamin.domain, 'http://blog.pulipuli.info')
})

// Reset database
trait('DatabaseTransactions')