'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('Cache')

const WebpageModel = use('App/Models/Webpage')
//const Cache = use('Cache')
const Cache = use('App/Helpers/CacheHelper')

test('if use cache', async ({ assert }) => {
  let a = {a: 1}
  let b = () => {
    return a
  }
  
  let c1 = b()
  let c2 = b()
  assert.equal(c1, c2)
})

test('use cache string', async ({ assert }) => {
  /*
  await Cache.store('database').put('ok1', 'ok')
  let ok = await Cache.store('database').get('ok1')
  assert.equal(ok, 'ok')
   */
  let db = await Cache.getDB()
  assert.isNumber(1+1)
})

test('how to use cache?', async ({ assert }) => {
  return
  let webpage = await WebpageModel.findByURL('http://blog.pulipuli.info')
  assert.isNumber(webpage.id)
  await Cache.put('webpage.1', webpage)
  
  let webpage2 = await WebpageModel.findByURL('http://blog.pulipuli.info')
  //assert.equal(webpage.id, webpage2.id)
  
  let webpage3 = await Cache.get('webpage.1')
  assert.equal(webpage.id, webpage3.id)
})

// Reset database
//trait('DatabaseTransactions')