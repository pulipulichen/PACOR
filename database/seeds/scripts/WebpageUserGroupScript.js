const AnnotationParameters = use('./parameters/AnnotationParameters.js')

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')

const Sleep = use('Sleep')

//const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
const url = '/test-lorem-ipsum'
let webpage

module.exports = {
  main: async function () {
    //console.log(__filename + ' start...')
    
    await this.createAdmin()
    await this.createGroups()
    
//    this.processGroup0User2()
    
    this.processGroup0User1()
    this.processGroup0User2()
    this.processGroup0User3()
    this.processGroup0User4()
    this.processGroup0User5()
    this.processGroup1User1()
    this.processGroup1User2()
    
    await Sleep(5) // 統統給我等待10秒鐘
    
    console.log(__filename + ' is finished.\n')
  },
  createAdmin: async function () {
    let domain = await DomainModel.findByURL(url)
    let adminsSetting = '布布:password'
    await domain.setAdmins(adminsSetting)
    //console.log('aaa')
  },
  
  createGroups: async function () {
    webpage = await WebpageModel.findByURL(url)
    
    let groupSetting = `布甲 布乙 布丙 布丁 布戊 布戊2
布己 布庚 布辛 布壬 布癸`
    await webpage.setGroupsList(groupSetting)
  },
  
  // ---------------------------
  /**
   * ['PreImaginary', 'IndividualReading', 'CollaborativeReading', 'PostRecall']
   */

  processGroup0User1: async function () {
    let user = await UserModel.findByNameInWebpage(webpage, '布甲')
    
    await user.startReadingProgress(webpage)
    await Sleep(0.3)
    await user.endReadingProgress(webpage)
    // 走到這裡應該要是 IndividualReading
    
    // 再來要建立標註
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper1())
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper2())
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper3())
    
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataLower1())
  },
  
  processGroup0User2: async function () {
    let user = await UserModel.findByNameInWebpage(webpage, '布乙')
    
    await user.startReadingProgress(webpage)
    await Sleep(0.3)
    await user.endReadingProgress(webpage)
    
    await AnnotationModel.create(webpage, user, AnnotationParameters.sectionAnnotation2())
    await Sleep(0.3)
    await user.endReadingProgress(webpage)
    // 走到這裡應該要是 CollaborativeReading
    
    // 再來要建立標註
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper1())
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper3())
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper3())
    
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataLower1())
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataLower2())
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataLower3())
  },
  
  processGroup0User3: async function () {
    let user = await UserModel.findByNameInWebpage(webpage, '布丙')
    
    await user.startReadingProgress(webpage)
    await Sleep(0.3)
    await user.endReadingProgress(webpage)
    
    await AnnotationModel.create(webpage, user, AnnotationParameters.sectionAnnotation1())
    
    await Sleep(0.3)
    await user.endReadingProgress(webpage)
    // 走到這裡應該要是 CollaborativeReading
    
    // 再來要建立標註
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper1())
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper2())
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper3())
    
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataLower3())
  },
  
  processGroup0User4: async function () {
    let user = await UserModel.findByNameInWebpage(webpage, '布丁')
    
    await user.startReadingProgress(webpage)
    await Sleep(0.3)
    await user.endReadingProgress(webpage)
    
    await AnnotationModel.create(webpage, user, AnnotationParameters.sectionAnnotation2())
    await Sleep(0.3)
    await user.endReadingProgress(webpage)
    
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper3())
    
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataLower1())
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataLower1())
    // 走到這裡應該要是 CollaborativeReading
  },
  
  processGroup0User5: async function () {
    let user = await UserModel.findByNameInWebpage(webpage, '布戊')
    
    await user.startReadingProgress(webpage)
    await Sleep(0.3)
    await user.endReadingProgress(webpage)
    
    await AnnotationModel.create(webpage, user, AnnotationParameters.sectionAnnotation2())
    await Sleep(0.3)
    await user.endReadingProgress(webpage)
    // 走到這裡應該要是 CollaborativeReading
  },
  
  // ----------------------------------
  
  processGroup1User1: async function () {
    let user = await UserModel.findByNameInWebpage(webpage, '布己')
    
    await user.startReadingProgress(webpage)
    await Sleep(0.5)
    await user.endReadingProgress(webpage)
    
    await AnnotationModel.create(webpage, user, AnnotationParameters.sectionAnnotation3())
    await Sleep(0.5)
    await user.endReadingProgress(webpage)
    // 走到這裡應該要是 CollaborativeReading
    
    // 再來要建立標註
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper1())
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper2())
    await AnnotationModel.create(webpage, user, AnnotationParameters.annotationDataUpper3())
  },
  
  processGroup1User2: async function () {
    let user = await UserModel.findByNameInWebpage(webpage, '布庚')
    
    await user.startReadingProgress(webpage)
    await Sleep(0.5)
    await user.endReadingProgress(webpage)
    // 走到這裡應該要是 IndividualReading
  }
}