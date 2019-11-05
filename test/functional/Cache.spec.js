'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * https://www.google.com/search?q=adonisjs+cache&oq=adonisjs+cache&aqs=chrome..69i57j69i60.8225j0j4&sourceid=chrome&ie=UTF-8
 */
const { test, trait } = use('Test/Suite')('Controllers/Models/Cache')

trait('Test/ApiClient')
trait('Session/Client')

const Cache = use('Cache')
const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html'

const cacheKeyBoolean = 'test.boolean'
const cacheKeyObject = 'test.object'
const cacheData = {
  a: 1,
  b: 2
}

test('remove all cache', async ({ assert, client }) => {
  await Cache.flush()
}).timeout(0)

test('get cache', async ({ assert, client }) => {
  let result = await Cache.get(cacheKeyBoolean)
  assert.equal(result, null)
}).timeout(0)

test('put cache', async ({ assert, client }) => {
  await Cache.forever(cacheKeyBoolean, true)
  
  let result = await Cache.get(cacheKeyBoolean)
  assert.equal(result, true)
}).timeout(0)

test('remember cache', async ({ assert, client }) => {
  let result = await Cache.remember(cacheKeyObject, 1, async () => {
    //await Sleep(3)
    return cacheData
  })
  
  assert.isObject(result)
}).timeout(0)

test('remember cache again', async ({ assert, client }) => {
  let result = await Cache.remember(cacheKeyObject, 1, async () => {
    //await Sleep(3)
    return cacheData
  })
  
  assert.isObject(result)
}).timeout(0)


// Reset database
trait('DatabaseTransactions')