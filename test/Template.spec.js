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
let annotation


let config = {
  'a. hello word': async function ( { assert, client } ) {    
    assert.equal(1+1, 2)
  },
  'b. hello word': async function ( { assert, client } ) {    
    assert.equal(1+1, 3)
  },
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')