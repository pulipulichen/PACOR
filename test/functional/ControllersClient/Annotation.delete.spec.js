'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const {test, trait} = use('Test/Suite')('Controllers/Client/Annotation.delete.spec')

let title = __filename

const Test = use('Test')

trait('Test/ApiClient')
trait('Session/Client')

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')
const AnnotationModel = use('App/Models/Annotation')

const ReadingActivityLog = use('App/Models/ReadingActivityLog')

const Sleep = use('Sleep')
const Cache = use('Cache')

let userA
let userAID
let userB
let userBID
let webpage

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html?Annotation.delete.spec'

let config = {
  '0-1. create group in webpage': async ({ assert, client }) => {
    webpage = await WebpageModel.findByURL(url)
    let groupSetting = `a b c
d e
f g`
    await webpage.setGroupsList(groupSetting)

    let groups = await webpage.groups().fetch()
    assert.equal(groups.size(), 3)
  },
  '0-2. get userA and userB': async ({ assert, client }) => {
    userA = await UserModel.findByNameInWebpage(webpage, 'a')
    userB = await UserModel.findByNameInWebpage(webpage, 'b')

    userAID = userA.primaryKeyValue
    assert.isNumber(userAID)
    assert.equal(userA.display_name, 'a')
    
    userBID = userB.primaryKeyValue
    assert.isNumber(userBID)
    assert.equal(userB.display_name, 'b')
  },
  '0-3. move users to enable collaborative': async ({ assert, client }) => {
    let isEnableCollaborative
    
    await userA.goToCollaborativeReadingProgress(webpage)
    isEnableCollaborative = await userA.isEnableCollaboration(webpage)
    assert.equal(isEnableCollaborative, true)

    await userB.goToCollaborativeReadingProgress(webpage)
    isEnableCollaborative = await userB.isEnableCollaboration(webpage)
    assert.equal(isEnableCollaborative, true)
  },
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
  'a1: do login': async ({ assert, client }) => {
    let response
    response = await client.get('/client/auth/login')
            .header('Referer', url)
            .query({
              username: 'a'
            })
            //.session('adonis-auth', userAID)
            .end()

    response.assertStatus(200)
    response.assertJSONSubset({
      displayName: 'a'
    })
  },

  'a2: check login status after login': async ({ assert, client }) => {
    let response
    response = await client.get('/client/auth/checkLogin')
            .header('Referer', url)
            .session('adonis-auth', userAID)
            .end()

    response.assertStatus(200)
    response.assertJSONSubset({
      status: {
        displayName: 'a'
      }
    })
  },

  'a3: create a public annotation': async ({ assert, client }) => {
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
            .session('adonis-auth', userAID)
            .send(data)
            .end()

    console.log(response.text)
    //response.assertError([])
    response.assertStatus(200)
    response.assertText(1)
  },

  'a4: create a private annotation': async ({ assert, client }) => {
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
            .session('adonis-auth', userAID)
            .send(data)
            .end()

    //console.log(response.text)
    //response.assertError([])
    response.assertStatus(200)
    response.assertText(2)
  },

  'a5: is it a private annotation': async ({ assert, client }) => {
    let annotation = await AnnotationModel.find(2)
    //console.log(annotation.toJSON())
    assert.equal(annotation.public, false)
  },

  'a6: check annotation is logged': async ({ assert, client }) => {
    let logs = await ReadingActivityLog.findLog(1, 1, 'Annotation.create')

    assert.equal(logs.length, 2)

    let response = await client.get('/client/Annotation/indexMy')
            .header('Referer', url)
            .session('adonis-auth', userAID)
            .end()

    //console.log(response.text)
    console.log(JSON.stringify(response.body, null, ' '))
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

  },

  'a7: test index': async ({ assert, client }) => {
    let response = await client.get('/client/Annotation/index')
            .header('Referer', url)
            .session('adonis-auth', userAID)
            .end()

    //console.log(response.text)
    response.assertStatus(200)
    assert.equal(response.body.length, 2)
  },

  'a8: do logout': async ({ assert, client }) => {
    let response
    response = await client.get('/client/auth/logout')
            .header('Referer', url)
            .session('adonis-auth', userAID)
            .end()

    response.assertStatus(200)


  },

// --------------------

  'b1: do login': async ({ assert, client }) => {
    let response
    response = await client.get('/client/auth/login')
            .header('Referer', url)
            .query({
              username: 'b'
            })
            .session('adonis-auth', userBID)
            .end()

    response.assertStatus(200)
    response.assertJSONSubset({
      displayName: 'b'
    })
  },

  'b2: create a public annotation': async ({ assert, client }) => {
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
            .session('adonis-auth', userBID)
            .send(data)
            .end()

    //console.log(response.text)
    //response.assertError([])
    response.assertStatus(200)
    response.assertText(3)

    let afterTime = (new Date()).getTime()

    //console.log('b public time', afterTime)
    //await Sleep(2)
  },

  'b3: create a public annotation 2': async ({ assert, client }) => {
    let data = {
      anchorPositions: [
        {
          paragraph_seq_id: 1,
          paragraph_id: 'aaa1',
          start_pos: 120,
          end_pos: 140,
          anchor_text: 'AAA'
        },
      ],
      type: 'MainIdea',
      note: '測試筆記'
    }

    let response = await client.post('/client/Annotation/create')
            .header('Referer', url)
            .session('adonis-auth', userBID)
            .send(data)
            .end()

    //console.log(response.text)
    //response.assertError([])
    response.assertStatus(200)
    response.assertText(4)

    let afterTime = (new Date()).getTime()

    //console.log('b public time', afterTime)
    //await Sleep(2)
  },

  'b4: create a private annotation': async ({ assert, client }) => {
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
            .session('adonis-auth', userBID)
            .send(data)
            .end()

    //console.log(response.text)
    //response.assertError([])
    response.assertStatus(200)
    response.assertText(5)

    let afterTime = (new Date()).getTime()
    //console.log('b private time', afterTime)
  },

  'b5: test floatWidget': async ({ assert, client }) => {
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
            .session('adonis-auth', userBID)
            .end()

    //console.log(JSON.stringify(response, null, ' '))
    //console.log(response.text)
    response.assertStatus(200)

    //console.log(response.body)
    //console.log(JSON.stringify(response.body, null, ' '))
    assert.equal(response.body.annotationCount, 1)

    //console.log(response.body.annotation.id)
    assert.isObject(response.body.annotation)
  },

  'b6: remove annotation': async ({ assert, client }) => {
    let annotationID = 3

    let response = await client.get('/client/Annotation/destroy')
            .query({
              id: annotationID
            })
            .header('Referer', url)
            .session('adonis-auth', userBID)
            .end()

    response.assertStatus(200)

  },

  'b7: query float widget again': async ({ assert, client }) => {

    //await Cache.flush()

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
            .session('adonis-auth', userBID)
            .end()

    //console.log(JSON.stringify(response, null, ' '))
    //console.log(response.text)
    response.assertStatus(200)

    //console.log(response.body)
    //console.log(JSON.stringify(response.body, null, ' '))
    assert.equal(response.text, '0')
  },

  'b8: test list': async ({ assert, client }) => {
    let response = await client.get('/client/Annotation/list')
            .query({
              anchorPositions: [
                {
                  paragraph_id: 'aaa1',
                  start_pos: 120,
                  end_pos: 140
                }
              ],
            })
            .header('Referer', url)
            .session('adonis-auth', userBID)
            .end()

    //console.log(JSON.stringify(response, null, ' '))
    //console.log(response.text)
    response.assertStatus(200)

    //console.log(response.body)
    //console.log(JSON.stringify(response.body, null, ' '))
    assert.equal(response.body.annotationCount, 1)

    //console.log(response.body.annotation.id)
    assert.isArray(response.body.annotations)
  },

  'b9: remove annotation': async ({ assert, client }) => {
    let annotationID = 4

    let response = await client.get('/client/Annotation/destroy')
            .query({
              id: annotationID
            })
            .header('Referer', url)
            .session('adonis-auth', userBID)
            .end()

    response.assertStatus(200)

  },

  'b10: query list again': async ({ assert, client }) => {

    //await Cache.flush()

    let response = await client.get('/client/Annotation/list')
            .query({
              anchorPositions: [
                {
                  paragraph_id: 'aaa1',
                  start_pos: 120,
                  end_pos: 140
                }
              ],
            })
            .header('Referer', url)
            .session('adonis-auth', userBID)
            .end()

    //console.log(JSON.stringify(response, null, ' '))
    //console.log(response.text)
    response.assertStatus(200)

    //console.log(response.body)
    //console.log(JSON.stringify(response.body, null, ' '))
    assert.equal(response.text, '0')
  }
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')