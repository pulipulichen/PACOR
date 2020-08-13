'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const StatisticHelepr = use('App/Helpers/StatisticHelepr')

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
        
        let clamDegree = await this.calcClamDegree(options)
        let peerAsistDegree = await this.calcPeerAsistDegree(options)
        
        return {
          //'test': 'ok',
          'users': users.join(' '),
          'ClamTotal': StatisticHelepr.sum(clamDegree),
          'ClamMedian': StatisticHelepr.median(clamDegree),
          'PeerAsistTotal': StatisticHelepr.sum(peerAsistDegree),
          'PeerAsistMedian': StatisticHelepr.median(peerAsistDegree),
        }
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupIndicator
