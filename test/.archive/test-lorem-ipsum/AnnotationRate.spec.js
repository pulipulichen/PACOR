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

//const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
const url = '/test-lorem-ipsum'

let webpage
let response
let annotation
let comment

let config = {
  'a1. login 布丁 and rate an annotation': async function ( { assert, client } ) {    
    webpage = await WebpageModel.findByURL(url)
    
    response = await client.get('/client/auth/login')
          .header('Referer', url)
          .query({
            username: '布丁'
          })
          .session('adonis-auth', 1)
          .end()
  
    response.assertStatus(200)
    
    
  },
  'a2. 選擇別人的一個annotation': async function ( { assert, client } ) {    
    // -----------------
    // 選擇別人的一個annotation
    
    //let webpage
    let userBeCommented = await UserModel.findByNameInWebpage(webpage, '布乙')
    let annotations = await userBeCommented.annotations(webpage).fetch()
    annotation = annotations.first()
    //let annotationJSON = annotation.toJSON()
    
    assert.isNumber(annotation.id)
  },
  
  // ----------------------
  
  'b1-1. 按讚': async function ( { assert, client } ) {    
    // -------------------
    
    let rateData = {
      annotationID: annotation.id,
    }
    
    response = await client.post('/client/AnnotationRate/like')
          .header('Referer', url)
          .send(rateData)
          .session('adonis-auth', 1)
          .end()
  
    //console.log(response.text)
    response.assertStatus(200)
  },
  'b1-2. 計算讚數': async function ( { assert, client } ) {      
    // -------------------
    
    let likes = await annotation.likes().fetch()
    assert.equal(likes.size(), 1)
  },
  
  // ----------------------
  
  'b2-1. 按讚 取消': async function ( { assert, client } ) {    
    // -------------------
    
    let rateData = {
      annotationID: annotation.id,
    }
    
    response = await client.post('/client/AnnotationRate/like')
          .header('Referer', url)
          .send(rateData)
          .session('adonis-auth', 1)
          .end()
  
    //console.log(response.text)
    response.assertStatus(200)
  },
  'b2-2. 計算讚數': async function ( { assert, client } ) {      
    // -------------------
    
    let likes = await annotation.likes().fetch()
    assert.equal(likes.size(), 0)
  },
  
  // ----------------------
  
  'c1. 發表評論': async function ( { assert, client } ) {      
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
    
  },
  
  'c2. 取得評論ID': async function ( { assert, client } ) {
    let comments = await annotation.comments().fetch()
    assert.equal(comments.size(), 1)
    comment = comments.first()
  },
  
  
  // ----------------------
  
  'd1-1. 評論按讚': async function ( { assert, client } ) {    
    // -------------------
    
    let rateData = {
      commentID: comment.id,
    }
    
    response = await client.post('/client/AnnotationRate/likeComment')
          .header('Referer', url)
          .send(rateData)
          .session('adonis-auth', 1)
          .end()
  
    //console.log(response.text)
    response.assertStatus(200)
  },
  'd1-2. 計算評論讚數': async function ( { assert, client } ) {      
    // -------------------
    
    let likes = await comment.likes().fetch()
    assert.equal(likes.size(), 1)
  },
  
  // ----------------------
  
  'd2-1. 評論按讚 取消': async function ( { assert, client } ) {    
    // -------------------
    
    let rateData = {
      commentID: comment.id,
    }
    
    response = await client.post('/client/AnnotationRate/likeComment')
          .header('Referer', url)
          .send(rateData)
          .session('adonis-auth', 1)
          .end()
  
    //console.log(response.text)
    response.assertStatus(200)
  },
  'd2-2. 計算評論讚數': async function ( { assert, client } ) {      
    // -------------------
    
    let likes = await comment.likes().fetch()
    assert.equal(likes.size(), 0)
  },
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')