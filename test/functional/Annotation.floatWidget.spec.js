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
const AnnotationModel = use('App/Models/Annotation')

const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html'

test('create group in webpage', async ({ assert, client }) => {
  let webpage = await WebpageModel.findByURL(url)
  let groupSetting = `a b c
d e
f g`
  await webpage.setGroupsList(groupSetting)
  
  let groups = await webpage.groups().fetch()
  assert.equal(groups.size(), 3)
}).timeout(0)
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
test('a: do login', async ({ assert, client }) => {
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

test('a: check login status before login', async ({ assert, client }) => {
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

test('a: create a public annotation', async ({ assert, client }) => {
  let data = {
    anchorPositions: [
      {
        paragraph_seq_id: 1,
        paragraph_id: 'aaa1',
        start_pos: 2,
        end_pos: 4,
        anchor_text: 'AAA'
      },
      {
        paragraph_seq_id: 2,
        paragraph_id: 'aaa2',
        start_pos: 2,
        end_pos: 4,
        anchor_text: 'AAA'
      }
    ],
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

test('a: create a private annotation', async ({ assert, client }) => {
  let data = {
    anchorPositions: [
      {
        paragraph_seq_id: 1,
        paragraph_id: 'aaa1',
        start_pos: 2,
        end_pos: 4,
        anchor_text: 'AAA'
      },
      {
        paragraph_seq_id: 2,
        paragraph_id: 'aaa2',
        start_pos: 2,
        end_pos: 4,
        anchor_text: 'AAA'
      }
    ],
    type: 'MainIdea',
    note: '測試筆記',
    public: false
  }
  
  let response = await client.post('/client/Annotation/create')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .send(data)
          .end()
  
  //console.log(response.text)
  //response.assertError([])
  response.assertStatus(200)
  response.assertText(2)
})

test('a: is it a private annotation', async ({ assert, client }) => {
  let annotation = await AnnotationModel.find(2)
  //console.log(annotation.toJSON())
  assert.equal(annotation.public, false)
})

test('a: check annotation is logged', async ({ assert, client }) => {
  let logs = await ReadingActivityLog.findLog(1, 1, 'Annotation.create')
  
  assert.equal(logs.length, 2)
  
  let response = await client.get('/client/Annotation/indexMy')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  //console.log(response.text)
  //console.log(JSON.stringify(response.body, null, ' '))
  response.assertStatus(200)
  assert.equal(response.body.length, 2)
  response.assertJSONSubset([
    {
      type: 'MainIdea',
      note: '測試筆記'
    }
  ])
  
  let updated_at_unixms = response.body[0].updated_at_unixms
  assert.isNumber(updated_at_unixms)
  
  let logs2 = await ReadingActivityLog.findLog(1, 1, 'Annotation.indexMy')
  assert.equal(logs2.length, 1)
  
})

test('a: test index', async ({ assert, client }) => {
  let response = await client.get('/client/Annotation/index')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  //console.log(response.text)
  response.assertStatus(200)
  assert.equal(response.body.length, 2)
})

test('a: do logout', async ({ assert, client }) => {
  let response
  response = await client.get('/client/auth/logout')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  response.assertStatus(200)
  
  
}).timeout(0)
        
// --------------------

test('b: do login', async ({ assert, client }) => {
  let response
  response = await client.get('/client/auth/login')
          .header('Referer', url)
          .query({
            username: 'b'
          })
          .session('adonis-auth', 2)
          .end()
  
  response.assertStatus(200)
  response.assertJSONSubset({
    displayName: 'b'
  })
})


test('b: create a public annotation', async ({ assert, client }) => {
  let data = {
    anchorPositions: [
      {
        paragraph_seq_id: 1,
        paragraph_id: 'aaa1',
        start_pos: 12,
        end_pos: 14,
        anchor_text: 'AAA'
      },
    ],
    type: 'MainIdea',
    note: '測試筆記'
  }
  
  let response = await client.post('/client/Annotation/create')
          .header('Referer', url)
          .session('adonis-auth', 2)
          .send(data)
          .end()
  
  //console.log(response.text)
  //response.assertError([])
  response.assertStatus(200)
  response.assertText(3)
  
  let afterTime = (new Date()).getTime()
  
  //console.log('b public time', afterTime)
  //await Sleep(2)
}).timeout(0)

test('b: create a private annotation', async ({ assert, client }) => {
  let data = {
    anchorPositions: [
      {
        paragraph_seq_id: 1,
        paragraph_id: 'aaa1',
        start_pos: 2,
        end_pos: 4,
        anchor_text: 'AAA'
      },
      {
        paragraph_seq_id: 2,
        paragraph_id: 'aaa2',
        start_pos: 6,
        end_pos: 8,
        anchor_text: 'AAA'
      }
    ],
    type: 'MainIdea',
    note: '測試筆記'
  }
  
  let response = await client.post('/client/Annotation/create')
          .header('Referer', url)
          .session('adonis-auth', 2)
          .send(data)
          .end()
  
  //console.log(response.text)
  //response.assertError([])
  response.assertStatus(200)
  response.assertText(4)
  
  let afterTime = (new Date()).getTime()
  //console.log('b private time', afterTime)
})

test('b: test floatWidget', async ({ assert, client }) => {
  let response = await client.get('/client/Annotation/floatWidget')
          .query({
            anchorPositions: [
              {
                paragraph_id: 'aaa1',
                start_pos: 12,
                end_pos: 14
              }
            ],
          })
          .header('Referer', url)
          .session('adonis-auth', 2)
          .end()
  
  //console.log(JSON.stringify(response, null, ' '))
  //console.log(response.text)
  response.assertStatus(200)
  
  //console.log(response.body)
  //console.log(JSON.stringify(response.body, null, ' '))
  assert.equal(response.body.annotationCount, 1)
  assert.isObject(response.body.annotation)
})


// Reset database
//trait('DatabaseTransactions')