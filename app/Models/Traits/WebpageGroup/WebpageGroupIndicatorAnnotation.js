'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

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
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorAnnotation
