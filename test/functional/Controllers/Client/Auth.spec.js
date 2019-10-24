'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('Controllers/Client/Auth.spec')

trait('Test/ApiClient')
trait('Session/Client')

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')
const ReadingProgressModel = use('App/Models/ReadingProgress')

const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html'

test('check user login', async ({ assert, client }) => {
  
  let response = await client.get('/client/auth/login')
          .header('Referer', url)
          .query({
            username: 'a'
          })
          .session('adonis-auth', 1)
          .end()
  //console.log(response.text)
  response.assertStatus(200)
  
  
  let readingProgresses = response.body.readingProgresses
  
  assert.equal(readingProgresses.length, 4)
  assert.equal(readingProgresses[1].step_name, 'IndividualReading')
  assert.isNumber(readingProgresses[0].start_timestamp)
  assert.isNull(readingProgresses[0].end_timestamp)
  assert.equal(readingProgresses[0].isCompleted, false)
  
  assert.isString(response.body.avatar)
  assert.isString(response.body.role)
})

// Reset database
//trait('DatabaseTransactions')