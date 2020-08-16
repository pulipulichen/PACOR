'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const StatisticHelper = use('App/Helpers/StatisticHelper')

const IdeaHelper = use('App/Helpers/IdeaHelper')

class WebpageGroupIndicatorUserAttributes {

  register(Model) {
    
    /**
     * 課程滿意度
     * 
     * 只計算中位數
     * 
     * 最大值4
     * 最小值1
     * 
     * 數字越大，表示該組成員對整體活動越滿意
     * 數字越小，表示該組成員對整體活動越不滿意
     * 
     * @returns {Number}
     */
    Model.prototype.calcEvaluationDegree = async function (options) {
      let cacheKey = Cache.key('calcEvaluationDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          try {
            let c = user.getAttribute('evaluation')
            countList.push(c)
          }
          catch (e) {
            // do nothing
          }
        }
        
        return StatisticHelper.round(StatisticHelper.median(countList), 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcEvaluationDegree = async function (options) {
    
    /**
     * 新命題的比例
     * https://github.com/pulipulichen/PACOR/issues/527
     * 
     * 先合併為小組命題，然後比較前後的差別
     * 
     * 最大值為1，表示後測幾乎都是新增的回想命題
     * 最小值為0，表示並沒有新的回想命題
     * 
     * @returns {Number}
     */
    Model.prototype.calcRecallNewIdeaProp = async function (options) {
      let cacheKey = Cache.key('calcRecallNewIdeaProp', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let predictList = []
        let recallList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          try {
            let predict = user.getAttribute('codes_predict')
            predictList.push(predict.split(' '))
            
            let recall = user.getAttribute('codes_recall')
            recallList.push(recall.split(' '))
          }
          catch (e) {
            // do nothing
          }
        }
        
        let predictMerge = IdeaHelper.merge(predictList)
        let recallMerge = IdeaHelper.merge(recallList)
        let recallNew = IdeaHelper.diff(predictMerge, recallMerge)
        
        let prop = recallNew.length / recallMerge.length
        
        return StatisticHelper.round(prop, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcEvaluationDegree = async function (options) {
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorUserAttributes
