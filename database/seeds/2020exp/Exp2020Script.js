
const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')

const Sleep = use('Sleep')

//const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
const Env = use('Env')

const uri = '/2020exp/articles/'
const urlHeader = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + Env.get('PORT')
const url = urlHeader + uri
const testPort = 4000
//const urlTest = 'http://localhost:4000/test-lorem-ipsum'
const urlTest = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + testPort + uri

let webpage

const SeedHelper = use('App/Helpers/SeedHelper')

module.exports = {
  main: async function () {
    //console.log(__filename + ' start...')
    
    await this.createAdmin()
    
    await this.pacor2020ef()
    await this.pacor2020es()
    await this.pacor2020et()
    
    await this.pacor2020cf()
    await this.pacor2020cs()
    await this.pacor2020ct()
    
    await this.pacor2020tf()
    await this.pacor2020ts()
    await this.pacor2020tt()
    
    await Sleep(5) // 統統給我等待10秒鐘
    
    console.log(__filename + ' is finished.\n')
  },
  createAdmin: async function () {
    let domain = await DomainModel.findByURL(url)
    let adminsSetting = 'teacher:password'
    await domain.setAdmins(adminsSetting)
  },
  
  // -----------------------
  
  pacor2020ef: async function () {
    let u = urlHeader + '/2020exp/articles/e-rice/'
    let webpageGroup = use('./pacor2020eGroup.js')
    let webpageConfig = use('./pacor2020efConfig.js')
    await SeedHelper(u, webpageConfig, webpageGroup)
  },
  pacor2020es: async function () {
    let u = urlHeader + '/2020exp/articles/e-microscope/'
    let webpageGroup = use('./pacor2020eGroup.js')
    let webpageConfig = use('./pacor2020esConfig.js')
    await SeedHelper(u, webpageConfig, webpageGroup)
  },
  pacor2020et: async function () {
    let u = urlHeader + '/2020exp/articles/e-colorectal-cancer/'
    let webpageGroup = use('./pacor2020eGroup.js')
    let webpageConfig = use('./pacor2020esConfig.js')
    await SeedHelper(u, webpageConfig, webpageGroup)
  },
  
  // -----------------------
  
  pacor2020cf: async function () {
    let u = urlHeader + '/2020exp/articles/c-rice/'
    let webpageGroup = use('./pacor2020cGroup.js')
    let webpageConfig = use('./pacor2020cfConfig.js')
    await SeedHelper(u, webpageConfig, webpageGroup)
  },
  pacor2020cs: async function () {
    let u = urlHeader + '/2020exp/articles/c-microscope/'
    let webpageGroup = use('./pacor2020cGroup.js')
    let webpageConfig = use('./pacor2020csConfig.js')
    await SeedHelper(u, webpageConfig, webpageGroup)
  },
  pacor2020ct: async function () {
    let u = urlHeader + '/2020exp/articles/c-colorectal-cancer/'
    let webpageGroup = use('./pacor2020cGroup.js')
    let webpageConfig = use('./pacor2020csConfig.js')
    await SeedHelper(u, webpageConfig, webpageGroup)
  },
  
  // -----------------------
  
  pacor2020tf: async function () {
    let u = urlHeader + '/2020exp/articles/t-rice/'
    let webpageGroup = use('./pacor2020tGroup.js')
    let webpageConfig = use('./pacor2020tsConfig.js')
    await SeedHelper(u, webpageConfig, webpageGroup)
  },
  pacor2020ts: async function () {
    let u = urlHeader + '/2020exp/articles/t-microscope/'
    let webpageGroup = use('./pacor2020tGroup.js')
    let webpageConfig = use('./pacor2020tsConfig.js')
    await SeedHelper(u, webpageConfig, webpageGroup)
  },
  pacor2020tt: async function () {
    let u = urlHeader + '/2020exp/articles/t-colorectal-cancer/'
    let webpageGroup = use('./pacor2020tGroup.js')
    let webpageConfig = use('./pacor2020tsConfig.js')
    await SeedHelper(u, webpageConfig, webpageGroup)
  }
}