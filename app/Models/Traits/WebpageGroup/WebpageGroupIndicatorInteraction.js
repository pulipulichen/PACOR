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
    Model.prototype.calcPeerAsistDegree = async function () {
      let cacheKey = Cache.key('calcPeerAsistDegree')
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let usersIDList = await this.getUsersIDList()
        
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
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorInteraction
