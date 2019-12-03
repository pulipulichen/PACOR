/* global __filename */

'use strict'
let title = __filename

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

//const url = 'http://blog.pulipuli.info/'
//const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
const url = '/test-lorem-ipsum'

let webpage
let user
let userID
let annotation
let annotationID

let username = '布布'
let password = 'password'


let config = {
  'a. find 布布 user': async function ({assert, client}) {
    webpage = await WebpageModel.findByURL(url)
    user = await UserModel.findByNameInWebpage(webpage, username)
    userID = user.primaryKeyValue
  },
  'b1. 布布 try to login without password': async function ( { assert, client } ) {    
    let response = await client.get('/client/auth/login')
          .header('Referer', url)
          .query({
            username: username
          })
          //.session('adonis-auth', 1)
          .end()
    //console.log(response.text)
    response.assertStatus(500)
    assert.equal(response.text, 'HttpException: Login fail')
  },
  'b2. 布布 try to login with password': async function ( { assert, client } ) {    
    let response = await client.get('/client/auth/login')
          .header('Referer', url)
          .query({
            username: username,
            password: password
          })
          //.session('adonis-auth', 1)
          .end()
    //console.log(response.text)
    response.assertStatus(200)
    assert.equal(response.body.username, username)
    assert.equal(response.body.role, 'domain_admin')
  },
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')