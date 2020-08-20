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
    Model.prototype.calcGroupRecallNewIdeaProp = async function (options) {
      let cacheKey = Cache.key('calcGroupRecallNewIdeaProp', options)
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
    
    /**
     * 減少命題的數量，以小組為單位
     * https://github.com/pulipulichen/PACOR/issues/526
     * 
     * 先合併為小組命題，然後比較前後的差別
     * 
     * 最大值為1，表示後測幾乎都是新增的回想命題
     * 最小值為0，表示並沒有新的回想命題
     * 
     * @returns {Number}
     */
    Model.prototype.calcGroupRecallLessIdeaCount = async function (options) {
      let cacheKey = Cache.key('calcGroupRecallLessIdeaCount', options)
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
        let recallLess = IdeaHelper.diff(recallMerge, predictMerge)
        
        return recallLess.length
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcEvaluationDegree = async function (options) {
    
    /**
     * 新增命題的數量，以小組為單位
     * https://github.com/pulipulichen/PACOR/issues/526
     * 
     * 先合併為小組命題，然後比較前後的差別
     * 
     * 最大值為1，表示後測幾乎都是新增的回想命題
     * 最小值為0，表示並沒有新的回想命題
     * 
     * @returns {Number}
     */
    Model.prototype.calcGroupRecallNewIdeaCount = async function (options) {
      let cacheKey = Cache.key('calcGroupRecallLessIdeaCount', options)
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
        
        return recallNew.length
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcEvaluationDegree = async function (options) {
    
    /**
     * 新增命題量
     * https://github.com/pulipulichen/PACOR/issues/525
     * 
     * @returns {Number}
     */
    Model.prototype.calcUserRecallNewIdeaVector = async function (options) {
      let cacheKey = Cache.key('calcUserRecallNewIdeaVector', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let vector = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          try {
            let predict = user.getAttribute('codes_predict').split(' ')
            let recall = user.getAttribute('codes_recall').split(' ')
            
            let newList = IdeaHelper.diff(predict, recall)
            //console.log(lessList.join(' '))
            vector.push(newList.length)
          }
          catch (e) {
            // do nothing
          }
        }
        
        return vector
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcEvaluationDegree = async function (options) {
    
    
    /**
     * 減少命題量
     * https://github.com/pulipulichen/PACOR/issues/526
     * 
     * @returns {Number}
     */
    Model.prototype.calcUserRecallLessIdeaVector = async function (options) {
      let cacheKey = Cache.key('calcUserRecallLessIdeaVector', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let vector = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          try {
            let predict = user.getAttribute('codes_predict').split(' ')
            let recall = user.getAttribute('codes_recall').split(' ')
            
            let lessList = IdeaHelper.diff(recall, predict)
            //console.log(lessList.join(' '))
            vector.push(lessList.length)
          }
          catch (e) {
            // do nothing
          }
        }
        
        return vector
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcEvaluationDegree = async function (options) {
    
    /**
     * 團體評估法下的回憶命題
     * 
     * @returns {Array}
     */
    Model.prototype.getGroupRecallIdeas = async function (options) {
      let cacheKey = Cache.key('getGroupRecallIdeas', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let ideas = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          try {
            let recall = user.getAttribute('codes_recall').split(' ')
            
            ideas.push(recall)
          }
          catch (e) {
            // do nothing
          }
        }
        
        let recallMerge = IdeaHelper.merge(ideas)
        return recallMerge
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcEvaluationDegree = async function (options) {
    
    /**
     * 團體評估法下，回憶時，非文本命題的數量，轉換為負數
     * 
     * @returns {Number}
     */
    Model.prototype.calcGroupRecallInvertedNonTextbaseIdeasCount = async function (options) {
      let cacheKey = Cache.key('calcGroupRecallInvertedNonTextbaseIdeasCount', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        
        let recallMerge = await this.getGroupRecallIdeas(options)
        let recallTextbase = IdeaHelper.filterTextbaseIdea(recallMerge)
        let nonTextbaseCount = recallMerge.length - recallTextbase.length
        
        return nonTextbaseCount * -1
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcEvaluationDegree = async function (options) {
    
    /**
     * 團體評估法下，回憶時，非文本命題的數量，轉換為負數
     * 
     * @returns {Number}
     */
    Model.prototype.calcGroupRecallextbaseIdeasProp = async function (options) {
      let cacheKey = Cache.key('calcGroupRecallextbaseIdeasProp', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        
        let recallMerge = await this.getGroupRecallIdeas(options)
        let recallTextbase = IdeaHelper.filterTextbaseIdea(recallMerge)
        
        let prop = (recallTextbase.length / recallMerge.length)
        return StatisticHelper.round(prop, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcEvaluationDegree = async function (options) {
    
    /**
     * 個人回憶時，非文本命題的數量，轉換為負數
     * @returns {Array}
     */
    Model.prototype.calcRecallInvertedNonTextbaseIdeasVector = async function (options) {
      let cacheKey = Cache.key('calcRecallInvertedNonTextbaseIdeasVector', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let vector = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          try {
            let recall = user.getAttribute('codes_recall').split(' ')
            let recallTextbase = user.getAttributeRecallTextbaseIdeas()
            
            let nonTextbase = recall.length - recallTextbase.length
            
            vector.push(nonTextbase * -1)
          }
          catch (e) {
            // do nothing
          }
        }
        
        if (vector.length === 0) {
          return [0]
        }
        
        return vector
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcEvaluationDegree = async function (options) {
    
    /**
     * 個人回憶時，文本命題的數量佔全部命題的比例，取平均值
     * @returns {Array}
     */
    Model.prototype.calcRecallTextbaseIdeasPropVector = async function (options) {
      let cacheKey = Cache.key('calcRecallTextbaseIdeasPropVector', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let vector = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          try {
            let recall = user.getAttribute('codes_recall').split(' ')
            let recallTextbase = user.getAttributeRecallTextbaseIdeas()
            
            vector.push(recallTextbase.length / recall.length)
          }
          catch (e) {
            // do nothing
          }
        }
        
        return vector
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    } // Model.prototype.calcEvaluationDegree = async function (options) {
    
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorUserAttributes
