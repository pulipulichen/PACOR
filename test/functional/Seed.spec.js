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

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html'

let config = {
  'a. check admins is created by seed': async function ( { assert, client } ) {    
    //let webpage = await WebpageModel.findByURL(url)
    let domain = await DomainModel.findByURL(url)
    let admins = await domain.admins().fetch()
    
    assert.equal(admins.size(), 1)
  },
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')