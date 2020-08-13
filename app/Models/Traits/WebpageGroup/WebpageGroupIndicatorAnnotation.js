'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')
const StatisticHelper = use('App/Helpers/StatisticHelper')

class WebpageGroupIndicatorAnnotation {

  register(Model) {
    
    /**
     * 計算問題次數 * -1
     * 最大值是0
     * 最小值-max
     * 
     * 數字越大 (越接近0)，表示該組成員都沒有問題
     * 數字越小 (負數越大)，表示該組成員問題多多
     * 
     * 注意，時間點要是在個人閱讀的階段
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcNoConfusionVector = async function (options) {
      let cacheKey = Cache.key('calcNoConfusionDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let c = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
            stepName: 'IndividualReading',
            //stepName: 'CollaborativeReading',
            type: ['Confused', 'Clarified']
            //type: ['MainIdea']
          })
          countList.push(c.length * -1)
        }
        
        return countList
        //let startTimestamp = await this.getStartTimestamp(onlyCompleted)
        //let endTimestamp = await this.getEndTimestamp(onlyCompleted)
        //return usersIDList.join(',')
        //return endTimestamp
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/510
     * 額外標註率加總
     * 
     * 在進入協助階段後才開始撰寫的標註比例
     * 如果個人全部標註是10，3個標註是協助階段後才開始撰寫的內容
     * 那可能表示他想要擴大自己原本的知識，受到了啟發
     * 
     * 最小值max
     * 最小值是0
     * 
     * 數字越大，表示該組成員會受到合作影響，改變閱讀的重點或疑問
     * 數字越小，表示該組成員不受合作的影響
     * 
     * 注意，時間點要是在開放同儕協助的階段
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcDeeperAnnotationVector = async function (options) {
      let cacheKey = Cache.key('calcDeeperAnnotationDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let c = await user.getAnnotationIndicator(webpage, {
            includeDeleted: true, // 沒錯，包括刪除，因為我們要算的是他被影響的程度
            //stepName: 'IndividualReading',
            stepName: 'CollaborativeReading',
            //type: ['Confused', 'Clarified'] // 不限類型
            //type: ['MainIdea']
          })
          countList.push(c.length)
        }
        
        return countList
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/519
     * 整體標註次數
     * 
     * 不論階段
     * 如果標註次數越多
     * 表示這個團體更有機會看到別人的標註
     * 
     * 最小值max
     * 最小值是0
     * 
     * 數字越大，表示這個團體更有機會看到別人的標註
     * 數字越小，表示這個團體更沒機會看到別人的標註
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcTotalAnnotationVector = async function (options) {
      let cacheKey = Cache.key('calcTotalAnnotationVector', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let c = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
          })
          countList.push(c.length)
        }
        
        return countList
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/520
     * 有能力的示範者程度
     * 
     * 標註數量跟閱讀能力成正比的程度
     * 每組可以計算出一個r值
     * 
     * 數字越大，表示這個團體中，有能力的人示範更多，導致觀察學習的效果提升
     * 數字越小，表示這個團體中，有能力的人跟示範次數無關
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcSkilledDemonstrationDegree = async function (options) {
      let cacheKey = Cache.key('calcSkilledDemonstrationDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let annotationCountList = []
        let readCompList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          try {
            let readComp = user.getAttribute('read_comp')
            readCompList.push(readComp)

            let c = await user.getAnnotationIndicator(webpage, {
              includeDeleted: false,
            })
            annotationCountList.push(c.length)
          }
          catch (e) {}
        }
        
        let r = StatisticHelper.correlationCoefficientR(annotationCountList, readCompList)
        return StatisticHelper.round(r, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/517
     * 單向展示程度 monologues
     * 
     * 如果小組內標註數量差異很大
     * 那表示可能被教者很有機會會看到教人者的示範
     * 因此提高他們的學習成效
     * 
     * 最大值max
     * 最小值是0
     * 
     * 數字越大，表示可能被教者很有機會會看到教人者的示範
     * 數字越小，表示可能被教者沒有機會會看到教人者的示範
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcMonologuesDegree = async function (options) {
      let cacheKey = Cache.key('calcMonologuesDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let c = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
            stepName: 'IndividualReading',
            //stepName: 'CollaborativeReading',
            //type: ['Confused', 'Clarified'] // 不限類型
            //type: ['MainIdea']
          })
          countList.push(c.length)
        }
        
        return StatisticHelper.iqr(countList)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorAnnotation
