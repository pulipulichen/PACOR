const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')
const AnnotationCommentModel = use('App/Models/AnnotationComment')

const Sleep = use('Sleep')

const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
let webpage


module.exports = {
  main: async function () {
    
    webpage = await WebpageModel.findByURL(url)
    
    await this.addComments()
    await this.addRates()
  },
  addComments: async function () {
    
    let userBeCommented = await UserModel.findByNameInWebpage(webpage, '布乙')
    let annotations = await userBeCommented.annotations(webpage).fetch()
    let annotation = annotations.nth(1)
    
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
    
  }
}