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

const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
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
    
    assert.equal(group.toJSON().users.length, 5)
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
  'c0-2. 布乙': async function ( { assert, client } ) {    
    //let webpage = await WebpageModel.findByURL(url)
    let user = await UserModel.findByNameInWebpage(webpage, '布乙')
    
    let stepName = await user.getCurrentReadingProgressStepName(webpage)
    assert.equal(stepName, 'CollaborativeReading')
    
    let annotations = await AnnotationModel.findByWebpageUser(webpage, user, {})
    assert.equal(annotations.size(), 13) // 包含布甲跟布乙
  },
  'c0-3. 布丙': async function ( { assert, client } ) {    
    //let webpage = await WebpageModel.findByURL(url)
    let user = await UserModel.findByNameInWebpage(webpage, '布丙')
    
    let stepName = await user.getCurrentReadingProgressStepName(webpage)
    assert.equal(stepName, 'CollaborativeReading')
    
    let annotations = await AnnotationModel.findByWebpageUser(webpage, user, {})
    assert.equal(annotations.size(), 13) // 包含布甲跟布乙
  },
  'c0-4. 布丁': async function ( { assert, client } ) {    
    //let webpage = await WebpageModel.findByURL(url)
    let user = await UserModel.findByNameInWebpage(webpage, '布丁')
    
    let stepName = await user.getCurrentReadingProgressStepName(webpage)
    assert.equal(stepName, 'CollaborativeReading')
    
    let annotations = await AnnotationModel.findByWebpageUser(webpage, user, {})
    assert.equal(annotations.size(), 13) // 包含布甲跟布乙
  },
  'c0-5. 布戊': async function ( { assert, client } ) {    
    //let webpage = await WebpageModel.findByURL(url)
    let user = await UserModel.findByNameInWebpage(webpage, '布戊')
    
    let stepName = await user.getCurrentReadingProgressStepName(webpage)
    assert.equal(stepName, 'PreImaginary')
    
    let annotations = await AnnotationModel.findByWebpageUser(webpage, user, {})
    assert.equal(annotations.size(), 0) // 包含布甲跟布乙
  },
  'c1-1. 布己': async function ( { assert, client } ) {    
    //let webpage = await WebpageModel.findByURL(url)
    let user = await UserModel.findByNameInWebpage(webpage, '布己')
    
    let stepName = await user.getCurrentReadingProgressStepName(webpage)
    assert.equal(stepName, 'CollaborativeReading')
    
    let annotations = await AnnotationModel.findByWebpageUser(webpage, user, {})
    assert.equal(annotations.size(), 4) // 包含布甲跟布乙
  },
  'c1-2. 布庚': async function ( { assert, client } ) {    
    //let webpage = await WebpageModel.findByURL(url)
    let user = await UserModel.findByNameInWebpage(webpage, '布庚')
    
    let stepName = await user.getCurrentReadingProgressStepName(webpage)
    assert.equal(stepName, 'IndividualReading')
    
    let annotations = await AnnotationModel.findByWebpageUser(webpage, user, {})
    assert.equal(annotations.size(), 0) // 包含布甲跟布乙
  },
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')