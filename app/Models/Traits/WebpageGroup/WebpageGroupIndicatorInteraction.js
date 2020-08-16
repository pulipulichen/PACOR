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
    Model.prototype.calcConnectednessDegree = async function (options, type) {
      let cacheKey = Cache.key('calcConnectednessDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let network = await this.buildInteractionNetwork(options)
        //console.log(network)
        let result = []
        if (type === 'all'
                || type === 'full') {
          
          let resultMap = {}
          usersIDList.forEach(userID1 => {
            
            for (let i = 0; i < usersIDList.length; i++) {
              let userID2 = usersIDList[i]
              
              let keyArray = [userID1, userID2]
              if (type === 'all') {
                keyArray.sort()
              }
              let key = keyArray.join(',')
              if (typeof(resultMap[key]) === 'undefined') {
                resultMap[key] = false
              }
              
              if (resultMap[key] === true) {
                continue
              }
              
              let matchOut = false
              if (typeof(network[userID1]) === 'object'
                      && typeof(network[userID1][userID2]) === 'number'
                      && network[userID1][userID2] > 0) {
                matchOut = true
              }
              
              if (matchOut) {
                resultMap[key] = true
              }
            }
          })
          
          Object.keys(resultMap).forEach(key => {
            if (resultMap[key] === true) {
              result.push(1)
            }
            else {
              result.push(0)
            }
          })
          
          //console.log(result)
        }
        else if (type === 'out') {
          usersIDList.forEach(userID => {
            if (typeof(network[userID]) === 'object'
                    && Object.keys(network[userID]).length > 0) {
              //result.push(Object.keys(network[userID]).length / usersIDList.length)
              result.push(1)
              return true // 符合from，下一個
            }
            
            result.push(0)  // 不符合
          })
        }
        else if (type === 'in') {
          usersIDList.forEach(userID => {
            let fromCount = 0
            for (let i = 0; i < usersIDList.length; i++) {
              let fromUserID = usersIDList[i]
              if (typeof(network[fromUserID]) === 'object'
                      && typeof(network[fromUserID][userID]) === 'number'
                      && network[fromUserID][userID] > 0) {
                result.push(1)
                return true
                //fromCount++
              }
            }
            
            //result.push(fromCount / usersIDList.length)  // 不符合
            result.push(0)
          })
        }
        
        if (result.length === 0) {
          return 0
        }
        
        let avg = StatisticHelper.average(result)
        return StatisticHelper.round(avg, 4)
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorInteraction
