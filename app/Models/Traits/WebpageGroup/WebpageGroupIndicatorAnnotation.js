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
     * 注意，時間點要是在開放同儕協助的階段
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcClamDegree = async function (options) {
      let cacheKey = Cache.key('calcClamDegree', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let onlyCompleted = (options.userFilter === 'onlyCompleted')
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        
        let count = 0
        for (let i = 0; i < usersIDList.length; i++) {
          let user = await UserModel.find(usersIDList[i])
          let c = await user.getAnnotationIndicator(webpage, {
            includeDeleted: false,
            stepName: 'IndividualReading',
            //stepName: 'CollaborativeReading',
            type: ['Confused', 'Clarified']
            //type: ['MainIdea']
          })
          count = count + c.length
        }
        
        return count * -1
        //let startTimestamp = await this.getStartTimestamp(onlyCompleted)
        //let endTimestamp = await this.getEndTimestamp(onlyCompleted)
        //return usersIDList.join(',')
        //return endTimestamp
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorAnnotation
