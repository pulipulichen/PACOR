const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')

const Sleep = use('Sleep')

//const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
const Env = use('Env')

const uri = '/2020exp/articles/e-rice'
//const url = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + Env.get('PORT') + uri
const testPort = 4000
//const urlTest = 'http://localhost:4000/test-lorem-ipsum'
const urlTest = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + testPort + uri

let webpage

module.exports = {
  main: async function (url, webpageConfig, webpageGroup) {
    //console.log(__filename + ' start...')
    
    let webpage = await WebpageModel.findByURL(url)
    await this.setupConfig(webpage, webpageConfig)
    await this.setupGroup(webpage, webpageGroup)
    
    await Sleep(5) // 統統給我等待10秒鐘
    
    console.log(__filename + ' is finished.\n')
  },
  setupConfig: async function (webpage, webpageConfig) {
    webpage.config = webpageConfig
    await webpage.save()
  },
  setupGroup: async function (webpage, webpageGroup) {
    await webpage.setGroupsList(webpageGroup)
  }
}