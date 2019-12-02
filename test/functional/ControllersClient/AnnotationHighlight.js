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
const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'

let webpage
let user
let userID
let annotation
let annotationID


let config = {
  '0. get webpage': async function ( { assert, client } ) {  
    webpage = await WebpageModel.findByURL(url)
    
    assert.isNumber(webpage.primaryKeyValue)
  },
  'a1. login with new user': async function ( { assert, client } ) {   
    
    let response = await client.get('/client/auth/login')
          .header('Referer', url)
          .query({
            username: '布丁' + (new Date()).getTime()
          })
          //.session('adonis-auth', 1)
          .end()
    //console.log(response.text)
    response.assertStatus(200)
    //response.body
    
    userID = response.body.status.userID
    assert.isNumber(userID)
    
    user = await UserModel.find(userID)
  },
  'a2. move to next step: IndividualReading': async function ( { assert, client } ) {    
    let response = await client.get('/client/auth/ReadingProgress/end')
          .header('Referer', url)
          .session('adonis-auth', userID)
          .end()
  
    response.assertStatus(200)
    
    let stepName = await user.getCurrentReadingProgressStepName(webpage)
    assert.equal(stepName, 'IndividualReading')
  },
  'b1. move to next step: IndividualReading': async function ( { assert, client } ) {    
    let response = await client.get('/client/auth/ReadingProgress/end')
          .header('Referer', url)
          .session('adonis-auth', userID)
          .end()
  
    response.assertStatus(200)
    
    let stepName = await user.getCurrentReadingProgressStepName(webpage)
    assert.equal(stepName, 'IndividualReading')
  },
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')