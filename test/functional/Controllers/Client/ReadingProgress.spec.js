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
  assert.isUndefined(readingProgresses[0].start_timestamp)
  assert.isUndefined(readingProgresses[0].end_timestamp)
})

test('start step', async ({ assert, client }) => {
  let response = await client.get('/Client/ReadingProgress/start')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  response.assertStatus(200)
  response.assertText('PreImaginary')
  //console.log(response.body)
  
})
test('end step', async ({ assert, client }) => {
  await Sleep(0.5)
  
  let response = await client.get('/client/ReadingProgress/end')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  response.assertStatus(200)
  //console.log(response.error)
  response.assertText('IndividualReading')
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
})
// Reset database
//trait('DatabaseTransactions')