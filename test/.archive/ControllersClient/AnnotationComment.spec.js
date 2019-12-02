/* global __filename */

'use strict'
// 'Controllers/Models/' + 
let title = __filename

/**
 * 
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
let response
let annotation
let user
let userBeCommented

let config = {
  'a. login 布丁': async function ( { assert, client } ) {    
    webpage = await WebpageModel.findByURL(url)
    user = await UserModel.findByNameInWebpage(webpage, '布丁')
    
    response = await client.get('/client/auth/login')
          .header('Referer', url)
          .query({
            username: '布丁'
          })
          .session('adonis-auth', user.primaryKeyValue)
          .end()
  
    //console.log(response.text)
    response.assertStatus(200)
  },
  'b1. get annotation': async function ( { assert, client } ) {    
    // -----------------
    // 選擇別人的一個annotation
    
    //let webpage
    userBeCommented = await UserModel.findByNameInWebpage(webpage, '布乙')
    let annotations = await userBeCommented.annotations(webpage).fetch()
    annotation = annotations.first()
    //let annotationJSON = annotation.toJSON()
    
    assert.isNumber(annotation.id)
    
    assert.notEqual(user.id, annotation.user_id)
  },
  'b2. comment other ': async function ( { assert, client } ) {    
    // -------------------
    
    let commentData = {
      annotationID: annotation.id,
      note: '我覺得很不妥'
    }
    
    response = await client.post('/client/AnnotationComment/create')
          .header('Referer', url)
          .send(commentData)
          .session('adonis-auth', user.primaryKeyValue)
          .end()
  
    //console.log(response.text)
    response.assertStatus(200)
    
    // -------------------
    
    let comments = await annotation.comments().fetch()
    assert.equal(comments.size(), 1)
    
    let comment = comments.first().toJSON()
    assert.isNumber(comment.updated_at_unixms)
  },
  'c1. get annotation': async function ( { assert, client } ) {    
    // -----------------
    // 選擇別人的一個annotation
    
    //let webpage
    userBeCommented = await UserModel.findByNameInWebpage(webpage, '布丙')
    let annotations = await userBeCommented.annotations(webpage).fetch()
    annotation = annotations.first()
    //let annotationJSON = annotation.toJSON()
    
    assert.isNumber(annotation.id)
    
    assert.notEqual(user.id, annotation.user_id)
  },
  'c2. comment other ': async function ( { assert, client } ) {    
    // -------------------
    
    let commentData = {
      annotationID: annotation.id,
      note: '我覺得很不妥'
    }
    
    response = await client.post('/client/AnnotationComment/create')
          .header('Referer', url)
          .send(commentData)
          .session('adonis-auth', user.primaryKeyValue)
          .end()
  
    //console.log(response.text)
    response.assertStatus(200)
    
    // -------------------
    
    let comments = await annotation.comments().fetch()
    assert.equal(comments.size(), 1)
    
    let comment = comments.first().toJSON()
    assert.isNumber(comment.updated_at_unixms)
  },
  'd. check log': async function ( { assert, client } ) {    
    //let commenter = await UserModel.findByNameInWebpage(webpage, '布丁')
    
    let logs = await user.logs()
            .orderBy('created_at_unixms', 'desc')
            .fetch()
    
    //console.log(logs.toJSON())
    assert.equal(logs.size(), 6)
    
    let log = logs.first()
    //console.log(log.toJSON())
    let withUsers = await log.withUsers().fetch()
    assert.equal(withUsers.size(), 1)
  },
  'e. recent time': async function ( { assert, client } ) {    
    //let commenter = await UserModel.findByNameInWebpage(webpage, '布丁')
    
    let userIDList = await user.getUserIDsInGroup(webpage)
    //console.log({userIDList})
    assert.isArray(userIDList)
    
    let options = {
      //userIDList: [userBeCommented]
      userIDList
    }
    
    let timeList = await user.getRecentInteractTime(webpage, options)
    //console.log(timeList)
    assert.isArray(timeList)
    assert.isNull(timeList[0])
    assert.isNumber(timeList[1])
  }
//  'b. login 布': async function ( { assert, client } ) {    
//    //assert.equal(1+1, 3)
//  },
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')