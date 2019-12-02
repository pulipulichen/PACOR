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
  'a. hello word': async function ( { assert, client } ) {   
    
    let response = await client.get('/client/auth/login')
          .header('Referer', url)
          .query({
            username: 'a'
          })
          .session('adonis-auth', 1)
          .end()
    //console.log(response.text)
    response.assertStatus(200)
    //response.body
    
  },
  'b. hello word': async function ( { assert, client } ) {    
    assert.equal(1+1, 2)
  },
  'c. test browser': async function ( { assert, client, browser } ) {
    const page = await browser.visit('http://blog.pulipuli.info/')
    //console.log(page)
    await page.assertHas('布丁布丁吃什麼？')
  }
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')