'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * https://www.google.com/search?q=adonisjs+cache&oq=adonisjs+cache&aqs=chrome..69i57j69i60.8225j0j4&sourceid=chrome&ie=UTF-8
 */
const { test, trait } = use('Test/Suite')('Controllers/Helpers/Cache')

trait('Test/ApiClient')
trait('Session/Client')

const Cache = use('Cache')
const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html?Cache.rememberWait.spec'

const cacheKeyBoolean = 'test.boolean'
const cacheKeyObject = 'test.object'
const cacheData = {
  a: 1,
  b: 2
}

test('rememberWait', async ({ assert, client }) => {
  await Cache.flush()
  let result = await Cache.rememberWait(cacheKeyBoolean, 1, () => {
    return true
  })
  
  assert.equal(result, true)
}).timeout(0)

test('模擬同時執行兩次-1 rememberWait', async ({ assert, client }) => {
  await Cache.flush()
  Cache.rememberWait(cacheKeyBoolean, 1, async () => {
    await Sleep(1)
    console.log('第一次執行完成了')
    return true
  })
  console.log('第一次應該會執行，不過實際上值還沒跑出來')
}).timeout(0)

test('模擬同時執行兩次-2 rememberWait', async ({ assert, client }) => {
  console.log('第二次執行前，不過要等待第一次執行完')
  let result = await Cache.rememberWait(cacheKeyBoolean, 1, async () => {
    //await Sleep(1)
    console.log('因為有快取，第二次執行時不會執行這段程式碼')
    return false
  })
  console.log('第二次執行就要等第一次執行完')
  assert.equal(result, true)
}).timeout(0)


test('模擬同時執行兩次-1 rememberForeverWait', async ({ assert, client }) => {
  await Cache.flush()
  Cache.rememberWait(cacheKeyBoolean, async () => {
    await Sleep(1)
    console.log('第一次執行完成了')
    return true
  })
  console.log('第一次應該會執行，不過實際上值還沒跑出來')
}).timeout(0)

test('模擬同時執行兩次-2 rememberForeverWait', async ({ assert, client }) => {
  console.log('第二次執行前，不過要等待第一次執行完')
  let result = await Cache.rememberWait(cacheKeyBoolean, async () => {
    //await Sleep(1)
    console.log('因為有快取，第二次執行時不會執行這段程式碼')
    return false
  })
  console.log('第二次執行就要等第一次執行完')
  assert.equal(result, true)
}).timeout(0)

// Reset database
trait('DatabaseTransactions')