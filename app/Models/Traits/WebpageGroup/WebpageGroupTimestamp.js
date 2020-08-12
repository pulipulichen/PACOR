'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const ReadingProgressModel = use('App/Models/ReadingProgress')

class WebpageGroupTimestamp {

  register(Model) {
    
    /**
     * 取得小組活動開始的起始時間點
     * @param {boolean} onlyCompleted
     * @returns {Number}
     */
    Model.prototype.getStartTimestamp = async function (onlyCompleted = false) {
      
      let cacheKey = Cache.key('getStartTimestamp', onlyCompleted)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        let webpage = await this.webpage().fetch()
        let webpageID = webpage.primaryKeyValue
        
        let result = await ReadingProgressModel.query()
                .where('webpage_id', webpageID)
                .whereIn('user_id', usersIDList)
                .whereNot('start_timestamp', null)
                .orderBy('start_timestamp')
                .first()
        
        //console.log(result)
        if (result === null || isNaN(result.start_timestamp)) {
          return null
        }
        else {
          return Number(result.start_timestamp)
        }
        //return usersIDList.join(',')
        
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    /**
     * 取得小組活動的結束時間點
     * @param {boolean} onlyCompleted
     * @returns {Number}
     */
    Model.prototype.getEndTimestamp = async function (onlyCompleted = false) {
      
      let cacheKey = Cache.key('getEndTimestamp', onlyCompleted)
      return await Cache.rememberWait([this, 'WebpageGroup'], cacheKey, async () => {
        let usersIDList = await this.getUsersIDList(onlyCompleted)
        let webpage = await this.webpage().fetch()
        let webpageID = webpage.primaryKeyValue
        
        let result = await ReadingProgressModel.query()
                .where('webpage_id', webpageID)
                .whereIn('user_id', usersIDList)
                .whereNot('end_timestamp', null)
                .orderBy('end_timestamp', 'desc')
                .first()
        
        //console.log(result)
        if (result === null || isNaN(result.end_timestamp)) {
          return null
        }
        else {
          return Number(result.end_timestamp)
        }
        //return usersIDList.join(',')
        
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupTimestamp
