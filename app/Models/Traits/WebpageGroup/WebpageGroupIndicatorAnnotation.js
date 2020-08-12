'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 

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
     * @param
     * @returns {Number}
     */
    Model.calcClamDegree = async function (options) {
      let cacheKey = Cache.key('calcClamDegree')
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicatorAnnotation
