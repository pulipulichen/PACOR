'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const StatisticHelper = use('App/Helpers/StatisticHelper')

class WebpageGroupIndicatorReadingActivityLog {

  register(Model) {
    
    /**
     * 
     * 
     * 最大值
     * 最小值
     * 
     * 數字越大，表示
     * 數字越小，表示
     * 
     * @returns {Number}
     */
    Model.prototype.calcModifyInCollaborationVector = async function (options) {
      let cacheKey = Cache.key('calcModifyInCollaborationVector', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          let c = await user.getReadingActivityLogIndicator(webpage, {
            stepName: 'CollaborativeReading',
            type: ["UserFilter.getUserWords"]
          })
          countList.push(c.length)
        }
        
        return countList
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/521
     * 
     * 最大值
     * 最小值
     * 
     * 數字越大，表示
     * 數字越小，表示
     * 
     * @returns {Number}
     */
    Model.prototype.calcObserverPeerVector = async function (options) {
      let cacheKey = Cache.key('calcObserverPeerVector', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          let c = await user.getReadingActivityLogIndicator(webpage, {
            type: ["UserFilter.getUserWords"]
          })
          countList.push(c.length)
        }
        
        return countList
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorReadingActivityLog
