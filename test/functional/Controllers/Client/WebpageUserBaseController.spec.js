'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('Controllers/Client/WebpageUserBaseController')

trait('Test/ApiClient')
trait('Session/Client')

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html'

test('create group in webpage', async ({ assert, client }) => {
  let webpage = await WebpageModel.findByURL(url)
  let groupSetting = `a b c
d e
f g`
  await webpage.setGroupsList(groupSetting)
  
  let groups = await webpage.groups().fetch()
  assert.equal(groups.size(), 3)
})
/*
test('logout', async ({ assert, client }) => {
  
  let response
  response = await client.get('/client/auth/logout')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  response.assertStatus(200)
  response.assertText('1')
})

test('check login status before login', async ({ assert, client }) => {
  
  let response
  response = await client.get('/client/auth/checkLogin')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  response.assertStatus(200)
  response.assertText('0')
})
*/
test('do login', async ({ assert, client }) => {
  let response
  response = await client.get('/client/auth/login')
          .header('Referer', url)
          .query({
            username: 'a'
          })
          .session('adonis-auth', 1)
          .end()
  
  response.assertStatus(200)
  response.assertJSONSubset({
    displayName: 'a'
  })
})

test('check login status before login', async ({ assert, client }) => {
  let response
  response = await client.get('/client/auth/checkLogin')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  response.assertStatus(200)
  response.assertJSONSubset({
    displayName: 'a'
  })
})

test('create an annotation', async ({ assert, client }) => {
  
})

test('check annotation is logged', async ({ assert, client }) => {
  
})

/*
test('check login status after login', async ({ assert, client }) => {
  let response
  response = await client.get('/admin/auth/checkLogin')
          .session('adonis-auth', 1)
          .end()
  
  response.assertStatus(200)
  response.assertJSONSubset({
    role: 'global_admin'
  })
})
 */

// Reset database
//trait('DatabaseTransactions')