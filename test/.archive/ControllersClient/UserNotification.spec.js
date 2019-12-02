/* global __filename */

'use strict'
let title = 'Controllers/Models/' + __filename

/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */

const Test = use('Test')

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')

const AnnotationModel = use('App/Models/Annotation')

const ReadingActivityLog = use('App/Models/ReadingActivityLog')

const Sleep = use('Sleep')

const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
let webpage
let user
let annotation

let config = {
  'a. check there are notifications existed from seed': async function ( { assert, client } ) {    
    webpage = await WebpageModel.findByURL(url)
    user = await UserModel.findByNameInWebpage(webpage, '布乙')
    
    assert.isNumber(user.primaryKeyValue)
    
    let notifications = await user.notifications().fetch()
    assert.equal(notifications.size(), 5) // 重複的已經縮減了
  },
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')