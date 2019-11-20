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

let config = {
  'a. login 布丁 and comment other': async function ( { assert, client } ) {    
    webpage = await WebpageModel.findByURL(url)
    
    response = await client.get('/client/auth/login')
          .header('Referer', url)
          .query({
            username: '布丁'
          })
          .session('adonis-auth', 1)
          .end()
  
    response.assertStatus(200)
    
    // -----------------
    // 選擇別人的一個annotation
    
    //let webpage
    let userBeCommented = await UserModel.findByNameInWebpage(webpage, '布乙')
    let annotations = await userBeCommented.annotations(webpage).fetch()
    let annotation = annotations.first()
    //let annotationJSON = annotation.toJSON()
    
    assert.isNumber(annotation.id)
    
    // -------------------
    
    let commentData = {
      annotationID: annotation.id,
      note: '我覺得很不妥'
    }
    
    response = await client.post('/client/AnnotationComment/create')
          .header('Referer', url)
          .send(commentData)
          .session('adonis-auth', 1)
          .end()
  
    //console.log(response.text)
    response.assertStatus(200)
    
    // -------------------
    
    let comments = await annotation.comments().fetch()
    assert.equal(comments.size(), 1)
    
    let comment = comments.first().toJSON()
    assert.isNumber(comment.updated_at_unixms)
  },
//  'b. login 布': async function ( { assert, client } ) {    
//    //assert.equal(1+1, 3)
//  },
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')