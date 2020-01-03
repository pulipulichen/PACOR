const AnnotationParameters = use('./parameters/AnnotationParameters.js')

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')

const Sleep = use('Sleep')

//const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
const Env = use('Env')

const uri = '/test-lorem-ipsum'
const url = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + Env.get('PORT') + uri
const testPort = 4000
//const urlTest = 'http://localhost:4000/test-lorem-ipsum'
const urlTest = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + testPort + uri

let webpage

module.exports = {
  main: async function () {
    await this.createAdmin()
  },
  createAdmin: async function () {
    let adminsSetting = '布布:password'
    let domain2 = await DomainModel.findByURL(urlTest)
    await domain2.setAdmins(adminsSetting)
    //console.log('aaa')
  },
}