'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */

let title = __filename
const Test = use('Test')

const {test, trait} = use('Test/Suite')('Controllers/Client/Webpage.agreement.spec')
const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')
const AnnotationModel = use('App/Models/Annotation')
trait('Test/ApiClient')
trait('Session/Client')

const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info.Webpage.agreement/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html?Webpage.agreement.spec'

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
  'a2. check agreement is work': async function ( { assert, client }) {
    let response = await client.get('/client/webpage/agreement')
            .header('Referer', url)
            .session('adonis-auth', userAID)
            .end()

    response.assertStatus(200)
    //console.log(response)
    assert.isString(response.text)
  }
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')