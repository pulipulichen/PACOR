'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const StatisticHelepr = use('App/Helpers/StatisticHelper')

class WebpageGroupIndicator {

  register(Model) {
    
    /**
     * 取得各種指標
     * 
     * @param {Object} options {
     *   userFilter: 'onlyCompleted' || 'all'
     * }
     * @returns {Number}
     */
    Model.prototype.calcIndicators = async function (options) {
      let cacheKey = Cache.key('calcIndicators', options)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let webpage = await this.webpage().fetch()
        
        let users = await this.getUsersDisplayName( (options.userFilter === 'onlyCompleted') ) 
        
        let output = {
          'users': users.join(' ')
        }
        
        let NoConfusionVector = await this.calcNoConfusionVector(options)
        output.NoConfusionTotal = StatisticHelepr.sum(NoConfusionVector)
        output.NoConfusionMedian = StatisticHelepr.median(NoConfusionVector)
        
        let PeerAsistVector = await this.calcPeerAsistVector(options)
        output.PeerAsistTotal = StatisticHelepr.sum(PeerAsistVector)
        output.PeerAsistMedian = StatisticHelepr.median(PeerAsistVector)
        
        let DeeperAnnotationVector = await this.calcDeeperAnnotationVector(options)
        output.DeeperAnnotationTotal = StatisticHelepr.sum(DeeperAnnotationVector)
        output.DeeperAnnotationMedian = StatisticHelepr.median(DeeperAnnotationVector)
        
        return output
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicator
