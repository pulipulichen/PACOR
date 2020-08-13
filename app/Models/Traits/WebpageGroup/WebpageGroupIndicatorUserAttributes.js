'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const StatisticHelper = use('App/Helpers/StatisticHelper')

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
      let cacheKey = Cache.key('calcEvaluation', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          try {
            let c = user.getCCCAttribute('evaluation')
            countList.push(c)
          }
          catch (e) {
            // do nothing
          }
        }
        
        return StatisticHelper.round(StatisticHelper.median(countList), 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorUserAttributes
