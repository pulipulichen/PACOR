'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('Controllers/Client/ReadingProgress.spec')

trait('Test/ApiClient')
trait('Session/Client')

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')
const ReadingProgressModel = use('App/Models/ReadingProgress')

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
})

test('check user reading progresses', async ({ assert, client }) => {
  //let webpage = await WebpageModel.findByURL(url)
  //let user = await UserModel.findByNameInWebpage(webpage, 'a')
  //let readingProgresses = await user.getReadingProgressStatus(webpage)
  let response = await client.get('/client/auth/login')
          .header('Referer', url)
          .query({
            username: 'a'
          })
          .session('adonis-auth', 1)
          .end()
  
  //console.log(response.body)
  let readingProgresses = response.body.readingProgresses
  
  assert.equal(readingProgresses.length, 4)
  assert.equal(readingProgresses[1].step_name, 'IndividualReading')
  assert.isNumber(readingProgresses[0].start_timestamp)
  assert.isNull(readingProgresses[0].end_timestamp)
  assert.equal(readingProgresses[0].isCompleted, false)
})

test('set log', async ({ assert, client }) => {
  await Sleep(1.5)
  
  let response = await client.post('/Client/ReadingProgress/setLog')
          .send({
            answer: 'qazwsx',
            start_timestamp: 123456
          })
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  console.log(response.text)
  response.assertStatus(200)
  response.assertText('1')
  //console.log(response.body)
})

test('get log', async ({ assert, client }) => {
  await Sleep(1.5)
  
  let response = await client.post('/Client/ReadingProgress/getLog')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  console.log(response.text)
  response.assertStatus(200)
  response.assertJSONSubset({
    answer: 'qazwsx',
    start_timestamp: 123456
  })
  //console.log(response.body)
})


test('end step', async ({ assert, client }) => {
  await Sleep(1)
  
  let response = await client.get('/Client/ReadingProgress/end')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  response.assertStatus(200)
  response.assertText('1')
  //console.log(response.body)
})

test('check user progresses after finishing', async ({ assert, client }) => {
  let webpage = await WebpageModel.findByURL(url)
  let user = await UserModel.findByNameInWebpage(webpage, 'a')
  
  let readingProgresses = await user.getReadingProgressStatus(webpage)
  //console.log(readingProgresses[0].end_timestamp)
  //console.log(readingProgresses)
  assert.equal(readingProgresses.length, 4)
  assert.isNumber(readingProgresses[0].start_timestamp)
  assert.isNumber(readingProgresses[0].end_timestamp)
  assert.equal(readingProgresses[0].isCompleted, true)
  assert.equal((readingProgresses[0].duration > 0), true)
  
  assert.isNumber(readingProgresses[1].start_timestamp)
  assert.isNull(readingProgresses[1].end_timestamp)
  assert.equal(readingProgresses[1].isCompleted, false)
  assert.equal(readingProgresses[1].duration, null)
})

// Reset database
//trait('DatabaseTransactions')