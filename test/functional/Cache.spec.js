'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('Controllers/Models/Cache')

trait('Test/ApiClient')
trait('Session/Client')

const Cache = use('Cache')
const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html'

const cacheKey = 'test'
const cacheData = {
  a: 1,
  b: 2
}

test('get cache', async ({ assert, client }) => {
  let result = await Cache.get(cacheKey)
  assert.equal(result, null)
}).timeout(0)

test('put cache', async ({ assert, client }) => {
  await Cache.forever(cacheKey, true)
  
  let result = await Cache.get(cacheKey)
  assert.equal(result, true)
}).timeout(0)


// Reset database
trait('DatabaseTransactions')