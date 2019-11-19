const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')

const AnnotationCommentModel = use('App/Models/AnnotationComment')
const AnnotationRateModel = use('App/Models/AnnotationRate')
const AnnotationCommentRateModel = use('App/Models/AnnotationCommentRate')

const Sleep = use('Sleep')

const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
let webpage
let annotation

module.exports = {
  main: async function () {
    
    webpage = await WebpageModel.findByURL(url)
    
    await this.addComments()
    await this.addRates()
    await this.addCommentRates()
  },
  addComments: async function () {
    
    let userBeCommented = await UserModel.findByNameInWebpage(webpage, '布乙')
    let annotations = await userBeCommented.annotations(webpage).fetch()
    annotation = annotations.nth(1)
    
    // -------------------
    
    let commenter = await UserModel.findByNameInWebpage(webpage, '布丙')
    let commentData = {
      annotationID: annotation.id,
      note: '回應評論回應評論回應評論'
    }
    
    for (let i = 0; i < 100; i++) {
      let comment = await AnnotationCommentModel.createFromJSON(webpage, commenter, commentData)
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
}