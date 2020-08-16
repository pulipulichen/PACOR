'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const StatisticHelper = use('App/Helpers/StatisticHelper')

class WebpageGroupIndicatorInteraction {

  register(Model) {
    
    /**
     * 計算小組的總建議次數
     * 最大值max
     * 最小值是0
     * 
     * 數字越大 (數字越大)，表示該組成員協助他人的成分很多
     * 數字越小 (數字越接近0)，表示該組成員不太協助別人
     * 
     * @returns {Number}
     */
    Model.prototype.calcPeerAsistVector = async function (options) {
      let cacheKey = Cache.key('calcPeerAsistDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let countList = []
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let c = await user.getCommentIndicator(webpage, {
            includeCommentDeleted: false, // 被刪掉就看不到建議了
            includeAnnotationDeleted: true,  // 因為都算是給了建議了
            includeMyself: false, // 給自己建議不算啊
            uniqleThreads: true // 同一串裡面多次回覆，只計算一次
          })
          countList.push(c.length)
        }
        
        return countList
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * 建立小組互動的網路
     * 
     * @returns {Number}
     */
    Model.prototype.buildInteractionNetwork = async function (options) {
      let cacheKey = Cache.key('buildInteractionNetwork', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let network = {}
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          
          let comments = await user.getCommentIndicator(webpage, {
            includeCommentDeleted: false, // 被刪掉就看不到建議了
            includeAnnotationDeleted: true,  // 因為都算是給了建議了
            includeMyself: true, // 給自己建議不算啊
            uniqleThreads: true, // 同一串裡面多次回覆，只計算一次
            withAnchor: true
          })
          
          setInteractionNetwork(network, user, comments)
          
          let rates = await user.getRateIndicator(webpage, {
            includeRateDeleted: false, // 被刪掉就看不到建議了
            includeAnchorDeleted: true,  // 因為都算是給了建議了
            withAnchor: true
          })
          
          setInteractionNetwork(network, user, rates)
        }
        
        //console.log(network)
        
        return network
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    
    let setInteractionNetwork = function (network, fromUser, records) {
      if (Array.isArray(records) === false
              || records.length === 0) {
        return false
      }
      
      let fromUserID = fromUser.primaryKeyValue
      if (!network[fromUserID]) {
        network[fromUserID] = {}
      }
      
      records.forEach(record => {
        //console.log(record)
        let toUserID = record.anchor.user_id
        
        if (typeof(network[fromUserID][toUserID]) !== 'number') {
          network[fromUserID][toUserID] = 0
        }
        
        network[fromUserID][toUserID]++
      })
    }
    
    /**
     * https://github.com/pulipulichen/PACOR/issues/530
     * 全連結比例
     * 
     * 最大值是1
     * 最小值是0
     * 
     * @param {Object} options = {
     *  userFilter: 'onlyCompleted',
     *  type: 'all' || 'in' || 'out' || 'full'
     * }
     * @returns {Number}
     */
    Model.prototype.calcConnectednessDegree = async function (options) {
      let cacheKey = Cache.key('calcConnectednessDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let network = await this.buildInteractionNetwork(options)
        
        if (options.type === 'all') {
          
        }
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorInteraction
