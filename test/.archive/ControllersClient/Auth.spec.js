'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */

let title = __filename
const Test = use('Test')

const {test, trait} = use('Test/Suite')('Controllers/Client/Auth.spec')

trait('Test/ApiClient')
trait('Session/Client')

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')
const ReadingProgressModel = use('App/Models/ReadingProgress')

const ReadingActivityLog = use('App/Models/ReadingActivityLog')

const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info.Auth.spec/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html?Auth.spec'

let userA
let userAID
let userB
let userBID
let webpage

let annotationIDtoDestroy
let annotationIDtoDestroy2

let publicAnnotationID

let config = {
  '0-1. create group in webpage': async function ({ assert, client }) {
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
  'a2. check user login': async function ( { assert, client }) {

    let response = await client.get('/client/auth/login')
            .header('Referer', url)
            .query({
              username: 'a'
            })
            .session('adonis-auth', userAID)
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
  }
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')