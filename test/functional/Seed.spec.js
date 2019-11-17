/* global __filename */

/**
 * ['PreImaginary', 'IndividualReading', 'CollaborativeReading', 'PostRecall']
 */

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

const url = 'http://blog.pulipuli.info/'
let webpage

let config = {
  'a. check admins is created by seed': async function ( { assert, client } ) {    
    //let webpage = await WebpageModel.findByURL(url)
    let domain = await DomainModel.findByURL(url)
    let admins = await domain.admins().fetch()
    
    assert.equal(admins.size(), 1)
  },
  'b. check group is created by seed': async function ( { assert, client } ) {    
    //let webpage = await WebpageModel.findByURL(url)
    webpage = await WebpageModel.findByURL(url)
    let group = await webpage.getGroup(0)
    
    assert.equal(group.toJSON().users.length, 4)
  },
  
  // ---------------------------------------------------------
  
  'c0-1. 布甲': async function ( { assert, client } ) {    
    //let webpage = await WebpageModel.findByURL(url)
    let user = await UserModel.findByNameInWebpage(webpage, '布甲')
    
    let stepName = await user.getCurrentReadingProgressStepName(webpage)
    
    assert.equal(stepName, 'IndividualReading')
    
    // 檢查標註數量
    let annotations = await AnnotationModel.findByWebpageUser(webpage, user, {})
    assert.equal(annotations.size(), 3)
  },
  'c0-1. 布乙': async function ( { assert, client } ) {    
    //let webpage = await WebpageModel.findByURL(url)
    let user = await UserModel.findByNameInWebpage(webpage, '布乙')
    
    let stepName = await user.getCurrentReadingProgressStepName(webpage)
    assert.equal(stepName, 'CollaborativeReading')
    
    let annotations = await AnnotationModel.findByWebpageUser(webpage, user, {})
    assert.equal(annotations.size(), 5) // 包含布甲跟布乙
  },
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')