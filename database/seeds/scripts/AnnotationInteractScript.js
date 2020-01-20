const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')

const AnnotationCommentModel = use('App/Models/AnnotationComment')
const AnnotationRateModel = use('App/Models/AnnotationRate')
const AnnotationCommentRateModel = use('App/Models/AnnotationCommentRate')

const Sleep = use('Sleep')

const Env = use('Env')

const uri = '/test-lorem-ipsum'
const url = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + Env.get('PORT') + uri
const testPort = 4000
//const urlTest = 'http://localhost:4000/test-lorem-ipsum'
const urlTest = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + testPort + uri

let webpage
let annotation
let annotation2

const RandomTextHelper = use('App/Helpers/RandomTextHelper.js')

module.exports = {
  main: async function () {
    console.log(__filename + ' start...')
    
    webpage = await WebpageModel.findByURL(url)
    
    console.log('await this.addComments()')
    await this.addComments()
    
    console.log('await this.addRates()')
    await this.addRates()
    
    console.log('await this.addCommentRates()')
    await this.addCommentRates()
    
    console.log('await this.addCommentRatesAll()')
    await this.addCommentRatesAll()
    
    console.log(__filename + ' is finished.')
  },
  addComments: async function () {
    
    let userBeCommented = await UserModel.findByNameInWebpage(webpage, '布乙')
    //console.log(userBeCommented.annotations(webpage).toSQL())
    let annotations = await userBeCommented.annotations(webpage).fetch()
    //console.log(userBeCommented.primaryKeyValue)
    //console.log(annotations.size())
    annotation = annotations.nth(1)
    annotation2 = annotations.nth(2)
    
    // -------------------
    
    let commenter1 = await UserModel.findByNameInWebpage(webpage, '布丙')
    let commenter2 = await UserModel.findByNameInWebpage(webpage, '布丁')
    //let commenter3 = await UserModel.findByNameInWebpage(webpage, '布戊')
    
    
    
    for (let i = 0; i < 100; i++) {
      //console.log('Add comment', i)
      let commentData = {
        annotationID: annotation.id,
        note: '#' + i + ' ' + RandomTextHelper()
      }
      
      await Sleep(0.01)
      await AnnotationCommentModel.createFromJSON(webpage, commenter1, commentData)
      await Sleep(0.01)
      await AnnotationCommentModel.createFromJSON(webpage, commenter2, commentData)
      
      let commentData2 = {
        annotationID: annotation2.id,
        note: '#' + i + ' ' + RandomTextHelper()
      }
      
      await Sleep(0.01)
      await AnnotationCommentModel.createFromJSON(webpage, commenter1, commentData2)
      await Sleep(0.01)
      await AnnotationCommentModel.createFromJSON(webpage, commenter2, commentData2)
      //await AnnotationCommentModel.createFromJSON(webpage, commenter3, commentData)
    }
    
  },
  addRates: async function () {
    
    let rater1 = await UserModel.findByNameInWebpage(webpage, '布丙')
    let rater2 = await UserModel.findByNameInWebpage(webpage, '布丁')
    let rateData = {
      annotationID: annotation.id,
    }
    
    await AnnotationRateModel.like(webpage, rater1, rateData)
    await AnnotationRateModel.like(webpage, rater2, rateData)
  },
  
  addCommentRates: async function () {
    let comments = await annotation.comments().fetch()
    let comment = comments.first()
    
    // -------------------
    
    let rater1 = await UserModel.findByNameInWebpage(webpage, '布丙')
    let rater2 = await UserModel.findByNameInWebpage(webpage, '布丁')
    
    let rateData = {
      commentID: comment.id,
    }
    
    await AnnotationCommentRateModel.like(webpage, rater1, rateData)
    await AnnotationCommentRateModel.like(webpage, rater2, rateData)
  },
  
  addCommentRatesAll: async function () {
    let comments = await annotation.comments().fetch()
    
    // -------------------
    
    let rater1 = await UserModel.findByNameInWebpage(webpage, '布戊')
    
    for (let i = 0; i < comments.size(); i++) {
      let comment = comments.nth(i)
      let rateData = {
        commentID: comment.id,
      }
      await Sleep(0.01)
      await AnnotationCommentRateModel.like(webpage, rater1, rateData)
    }
  },
}