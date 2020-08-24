'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const StatisticHelper = use('App/Helpers/StatisticHelper')

class WebpageGroupIndicatorReadingActivityLog {

  register(Model) {
    
    /**
     * 量化：修正標註次數
     * (Bowman-Perrott, Greenwood, & Tapia, 2007)
     * 
     * 在協助閱讀階段中，修改標註次數
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
     * 觀察同儕的次數
     * 
     * 有部分的行為記錄會被視為是觀察他人
     * 請注意程式碼裡面的內容囉
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
            type: [
              "UserFilter.getUserWords", // 協助他人的功能
              "Annotation.floatWidget",
              "Annotation.listSummary",
              "AnnotationRate.like",
              "AnnotationRate.likeComment",
              "UserNotification.read"
            ]
          })
          countList.push(c.length)
        }
        
        return countList
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    Model.prototype.getEventList = async function (options) {
      let cacheKey = Cache.key('getEventList', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        let groupCode = await this.getAttribute('groupCode')
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let list = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          let logs = await user.getReadingActivities(webpage, {
            stepName: 'CollaborativeReading'
          })
          list = list.concat(logs) 
        }
        
        list = list.map(l => {
          let output = {
            groupCode,
            ...l
          }
          return output
        })
        
        return list
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorReadingActivityLog
