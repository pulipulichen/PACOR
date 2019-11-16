'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */

const Test = use('Test')

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')
const AnnotationModel = use('App/Models/Annotation')

const ReadingActivityLog = use('App/Models/ReadingActivityLog')

const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html'

let title = 'Controllers/Models/User.getUserIDsInGroup'
let config = {
  'a. create group in webpage': async function ( { assert, client } ) {
    let webpage = await WebpageModel.findByURL(url)
    let groupSetting = `a b c
d e
f g`
    
    await webpage.setGroupsList(groupSetting)

    let groups = await webpage.groups().fetch()
    assert.equal(groups.size(), 3)
  },
  'b. a': function () {
    console.log('do nothing')
  }
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')