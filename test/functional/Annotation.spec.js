'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('Controllers/Client/Annotation')

trait('Test/ApiClient')
trait('Session/Client')

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')

const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

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
  let data = {
    highlights: [
      {
        paragraphy_seq_id: 1,
        paragraphy_id: 'aaa1',
        start_pos: 2,
        end_pos: 4,
        anchor_text: 'AAA'
      },
      {
        paragraphy_seq_id: 2,
        paragraphy_id: 'aaa2',
        start_pos: 2,
        end_pos: 4,
        anchor_text: 'AAA'
      }
    ],
    anchorText: '測試測試',
    type: 'MainIdea',
    note: '測試筆記'
  }
  
  let response = await client.post('/client/Annotation/create')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .send(data)
          .end()
  
  //console.log(response.text)
  //response.assertError([])
  response.assertStatus(200)
  response.assertText(1)
})

test('check annotation is logged', async ({ assert, client }) => {
  let logs = await ReadingActivityLog.findLog(1, 1, 'Annotation.create')
  
  assert.equal(logs.length, 1)
  
  let response = await client.get('/client/Annotation/indexMy')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  //console.log(response.text)
  console.log(response.body)
  response.assertStatus(200)
  response.assertJSONSubset([
    {
      type: 'MainIdea',
      note: '測試筆記'
    }
  ])
  
  let logs2 = await ReadingActivityLog.findLog(1, 1, 'Annotation.indexMy')
  assert.equal(logs2.length, 1)
  
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