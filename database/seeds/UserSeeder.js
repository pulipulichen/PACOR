'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
| 文章來源：https://www.ithome.com.tw/news/133958
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
//const Factory = use('Factory')
//const Database = use('Database')
const Sleep = use('Sleep')

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')

const url = 'http://blog.pulipuli.info/'
let webpage

class UserSeeder {
  async run () {
    await this.createAdmin()
    await this.createGroups()
    
    this.processGroup0User1()
    this.processGroup0User2()
    this.processGroup0User3()
    this.processGroup0User4()
    this.processGroup1User1()
    this.processGroup1User2()
    
    await Sleep(2) // 統統給我等待10秒鐘
  }
  
  async createAdmin () {
    let domain = await DomainModel.findByURL(url)
    let adminsSetting = '布布:password'
    await domain.setAdmins(adminsSetting)
    //console.log('aaa')
  }
  
  async createGroups () {
    webpage = await WebpageModel.findByURL(url)
    
    let groupSetting = `布甲 布乙 布丙 布丁
布戊 布己`
    await webpage.setGroupsList(groupSetting)
  }
  
  // ---------------------------
  /**
   * ['PreImaginary', 'IndividualReading', 'CollaborativeReading', 'PostRecall']
   */

  async processGroup0User1() {
    let user = await UserModel.findByNameInWebpage(webpage, '布甲')
    
    await user.startReadingProgress(webpage)
    await Sleep(0.5)
    await user.endReadingProgress(webpage)
    // 走到這裡應該要是 IndividualReading
    
    // 再來要建立標註
    await AnnotationModel.create(webpage, user, this.annotationDataUpper1())
    await AnnotationModel.create(webpage, user, this.annotationDataUpper2())
    await AnnotationModel.create(webpage, user, this.annotationDataUpper3())
  }
  
  async processGroup0User2() {
    let user = await UserModel.findByNameInWebpage(webpage, '布乙')
    
    await user.startReadingProgress(webpage)
    await Sleep(0.5)
    await user.endReadingProgress(webpage)
    await Sleep(0.5)
    await user.endReadingProgress(webpage)
    // 走到這裡應該要是 CollaborativeReading
    
    // 再來要建立標註
    await AnnotationModel.create(webpage, user, this.annotationDataUpper1())
    await AnnotationModel.create(webpage, user, this.annotationDataUpper3())
  }
  
  async processGroup0User3() {
    
  }
  
  async processGroup0User4() {
    
  }
  
  async processGroup1User1() {
    
  }
  
  async processGroup1User2() {
    
  }
  
  // --------------------------
  // 範圍是0-100
  // 0-49是上半部，屬於第一段 pacor-paragraph-id-0
  // 50-100是下半部，屬於第二段 pacor-paragraph-id-1
  // 三種不同類型標註
  
  annotationDataUpper1 () {
    return {
      type: 'MainIdea',
      notes: {
        'default': '今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準，期望讓偵辦各項刑事案件的作業過程，能落實個資與隱私保護，避免民眾個資外洩情事。'
      },
      anchorPositions: [
        {
          seq_id: 0,
          type: 'textContent',
          paragraph_id: 'pacor-paragraph-id-0',
          start_pos: 1,
          anchor_text: '今年8月新的隱私保護與個資管理'
        }
      ]
    }
  }
  
  annotationDataUpper2 () {
    return {
      type: 'Confused',
      notes: {
        'question': '對於保護個人資訊和隱私，近年各國政府在相關法令與法規的要求，已經變得越來越普遍'
      },
      anchorPositions: [
        {
          seq_id: 0,
          type: 'textContent',
          paragraph_id: 'pacor-paragraph-id-0',
          start_pos: 18,
          anchor_text: '對於保護個人資訊和隱私，近年各國政府在相關法令與法規的要求，已經變得越來越普遍'
        }
      ]
    }
  }
  
  annotationDataUpper3 () {
    return {
      type: 'Clarified',
      notes: {
        'question': 'Cookie的使用分為跨網站（Cross-Site）與同網站（Same-Site）',
        'answer': '通常同網站Cookie用來登入個別網站、記錄使用者偏好，支援網站分析之用。'
      },
      anchorPositions: [
        {
          seq_id: 0,
          type: 'textContent',
          paragraph_id: 'pacor-paragraph-id-0',
          start_pos: 14,
          anchor_text: '導入這項管理制度，並透過第三方驗證單位，來檢驗相關機制的有效性'
        }
      ]
    }
  }
  
  annotationDataLower1 () {
    
  }
  
  annotationDataLower2 () {
    
  }
  
  annotationDataSection1 () {
    
  }
  
  annotationDataSection2 () {
    
  }
}

module.exports = UserSeeder
