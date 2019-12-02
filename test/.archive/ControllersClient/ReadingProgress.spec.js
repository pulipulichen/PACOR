'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */


let title = __filename
const Test = use('Test')


const {test, trait} = use('Test/Suite')('Controllers/Client/ReadingProgress.spec')

trait('Test/ApiClient')
trait('Session/Client')

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')
const ReadingProgressModel = use('App/Models/ReadingProgress')

const ReadingActivityLog = use('App/Models/ReadingActivityLog')

const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info.ReadingProgress/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html?ReadingProgress.spec'

let userA
let userAID
let userB
let userBID
let webpage

let annotationIDtoDestroy
let annotationIDtoDestroy2

let publicAnnotationID

let config = {
  '0-1. create group in webpage': async function ( { assert, client }) {
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
  '0-3. move users to enable collaborative': async function ({ assert, client }) {
    let isEnableCollaborative
    
    await userA.goToCollaborativeReadingProgress(webpage)
    isEnableCollaborative = await userA.isEnableCollaboration(webpage)
    assert.equal(isEnableCollaborative, true)
    
    await userB.goToCollaborativeReadingProgress(webpage)
    isEnableCollaborative = await userB.isEnableCollaboration(webpage)
    assert.equal(isEnableCollaborative, true)
  },
  '0-4. change wepbage\'s config': async ({ assert, client }) => {
    let config = use('./../../test-config/reading-enableControlPermission')
    
    assert.isObject(config)
    webpage.config = config
    await webpage.save()
    
    //console.log(webpage.config.readingProgressModules.CollaborativeReading.annotation)
    //assert.equal((webpage.config.indexOf('"enableControlPermission":true,') > -1), true)
  },
  '0-5. check config has been changed': async function ({ assert, client }) {
    let stepName = await userA.getCurrentReadingProgressStepName(webpage)
    assert.equal(stepName, 'CollaborativeReading')
    
    let userConfig = await userA.getCurrentReadingProgressStepConfig(webpage)
    
    assert.isObject(userConfig)
    assert.equal(userConfig.annotation.enableControlPermission, true)
    
    let config = await webpage.getConfig()
    assert.isArray(config.selector.article)
    //assert.equal((webpage.config.indexOf('"enableControlPermission":true,') > -1), true)
  },

  /*
   test('test webpage config', async ({ assert, client }) => {
   let webpage = await WebpageModel.findByURL(url)
   webpage.config = {a: 1, b: 2}
   await webpage.save()
   
   webpage = await WebpageModel.findByURL(url)
   assert.isObject(webpage.config)
   })
   */
  'a1. check user reading progresses': async function ( { assert, client }) {
    //let webpage = await WebpageModel.findByURL(url)
    //let user = await UserModel.findByNameInWebpage(webpage, 'a')
    //let readingProgresses = await user.getReadingProgressStatus(webpage)
    let response = await client.get('/client/auth/login')
            .header('Referer', url)
            .query({
              username: 'a'
            })
            .session('adonis-auth', userAID)
            .end()

    //console.log(response.body)
    let readingProgresses = response.body.readingProgresses

    assert.equal(readingProgresses.length, 4)
    assert.equal(readingProgresses[1].step_name, 'IndividualReading')
    assert.isNumber(readingProgresses[0].start_timestamp)
    assert.isNull(readingProgresses[0].end_timestamp)
    assert.equal(readingProgresses[0].isCompleted, false)
  },
  'a2. set log from modal': async function ( { assert, client }) {
    await Sleep(5)

    let step = await ReadingProgressModel.find(1)
    step.log = {a: 1, b: 2}
    await step.save()

    step = await ReadingProgressModel.find(1)
    assert.isObject(step.log)
    assert.isNotNull(step.log)

    //console.log(response.body)
  },

  'a3. set log': async function ( { assert, client }) {
    await Sleep(1.5)

    let response = await client.post('/Client/ReadingProgress/setLog')
            .send({
              answer: 'qazwsx',
              start_timestamp: 123456
            })
            .header('Referer', url)
            .session('adonis-auth', userAID)
            .end()

    //console.log(response.text)
    response.assertStatus(200)
    response.assertText('1')
    //console.log(response.body)
  },

  'a4. get log': async function ( { assert, client }) {
    await Sleep(1.5)

    let response = await client.post('/Client/ReadingProgress/getLog')
            .header('Referer', url)
            .session('adonis-auth', userAID)
            .end()

    //console.log(response.text)
    response.assertStatus(200)
    response.assertJSONSubset({
      answer: 'qazwsx',
      start_timestamp: 123456
    })
    //console.log(response.body)
  },
  'a5. end step': async function ( { assert, client }) {
    await Sleep(1)

    let response = await client.get('/Client/ReadingProgress/end')
            .header('Referer', url)
            .session('adonis-auth', userAID)
            .end()

    response.assertStatus(200)
    response.assertText('1')
    //console.log(response.body)
  },
  'a6. check user progresses after finishing': async function ( { assert, client }) {
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
  }
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')