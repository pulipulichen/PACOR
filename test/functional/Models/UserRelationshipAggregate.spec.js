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

const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'

let webpage
let user
let annotation


let config = {
  'a. direct use': async function ( { assert, client } ) {    
    
    let user = await UserModel
            .query()
            .where('id', 3)
            .fetch()
    
    user = user.first()
    let types = await user.getAnnotationTypes()
    //console.log(types)
    assert.isArray(types)
  },
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')