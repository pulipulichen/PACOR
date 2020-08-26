'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const ReadingActivityLogModel = use('App/Models/ReadingActivityLog')

class UserReadingActivityLog {

  register(Model) {
    
    Model.prototype.getLog = async function (webpage, type) {
      let cacheKey = Cache.key('getLog', type)
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        return await ReadingActivityLogModel.findLog(webpage.primaryKeyValue, this.primaryKeyValue, type)
      })
    }
    
    Model.prototype.getLatestLogUnixMS = async function (webpage) {
      let cacheKey = Cache.key('getLatestLogUnixMS')
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        let logs = await ReadingActivityLogModel.findLatestLog(webpage.primaryKeyValue, this.primaryKeyValue)
        if (logs.length > 0) {
          return logs[0].created_at_unixms
        }
        else {
          return 0
        }
      })  // return await Cache.rememberWait([webpage, this], cacheKey, async () => {
    }
    
    let preventRepeatTypes = [
      "AnnotationComment.create",
      "AnnotationRate.like",
      "AnnotationRate.likeComment"
    ]
    
    let preventRepeatLastType = {}
    let preventRepeatLastID = {}
    
    Model.prototype.resetPreventRepeat = function (log) {
      let userID = this.primaryKeyValue
      let lastType = preventRepeatLastType[userID]
      
      if (!preventRepeatLastID[userID]) {
        preventRepeatLastID[userID] = {}
      }
      
      preventRepeatLastType[userID] = null
      preventRepeatLastID[userID][lastType] = null
    }
    
    Model.prototype.setPreventRepeat = function (log) {
      let userID = this.primaryKeyValue
      let lastType = preventRepeatLastType[userID]
      
      if (!preventRepeatLastID[userID]) {
        preventRepeatLastID[userID] = {}
      }
      
      let lastID = preventRepeatLastID[userID][lastType]
      
      if (preventRepeatTypes.indexOf(log.type) === -1) {
        preventRepeatLastType[userID] = null
        return true
      }
      
      if (lastType !== log.type) {
        preventRepeatLastID[userID][lastType] = null
      }
      
      let id = log.getRepeatableID()
      //console.log(1, userID, log.type, id, lastType, lastID, (lastType === log.type && lastID === id))
      
      if (lastType === log.type
              && lastID === id) {
        return false
      }
      
      preventRepeatLastID[userID][log.type] = id
      preventRepeatLastType[userID] = log.type
      //console.log(2, userID, log.type, preventRepeatLastType[userID], preventRepeatLastID[userID][preventRepeatLastType[userID]])
      //this.preventRepeatLastType = log.type
      return true
    }
    
    Model.prototype.getReadingActivities = async function (webpage, options = {}) {
      let cacheKey = Cache.key('getReadingActivities')
      return await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        //let status = await this.getReadingProgressStatus(webpage)
        //console.log(status)
        //throw new Error('test')
        
        let user_id = this.primaryKeyValue
        let logs = await ReadingActivityLogModel
                .query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', user_id)
                .orderBy('created_at')
                .fetch()
        
        let output = []
        for (let i = 0; i < logs.size(); i++) {
          let log = logs.nth(i)
          
          let stepName = await log.getCurrentStepName()
          if (options.stepName && options.stepName !== stepName) {
            continue
          }
          
          let code
          if (this.setPreventRepeat(log) === false) {
            code = false
          }
          
          if (code !== false) {
            code = await log.getCode()

            if (!code) {
              this.resetPreventRepeat(log)
              // 如果想要看沒有取得code的資料的話，請註解這一行
              //this.resetPreventRepeat(log)
              //continue
            }
          }
          
          
          
          if (!code) {
            code = ''
            //this.resetPreventRepeat(log)
          }
          
          output.push({
            user: this.display_name,
            user_id,
            unixms: log.created_at_unixms,
            event: code,
            stepName,
            type: log.type,
            log: JSON.stringify(log.log)
          })
        }
        
        return output
      })  // return await Cache.rememberWait([webpage, this], cacheKey, async () => {
    }
    
    Model.prototype.getReadingSequenceIDList = async function (webpage, options = {}) {
      let cacheKey = Cache.key('getReadingSequenceIDList', options)
      return await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        
        let user_id = this.primaryKeyValue
        let logs = await ReadingActivityLogModel
                .query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', user_id)
                .whereIn('type', ['Annotation.floatWidget', 'Annotation.create'])
                .orderBy('created_at')
                .fetch()
        
        let output = []
        for (let i = 0; i < logs.size(); i++) {
          let log = logs.nth(i)
          
          if (options.stepName) {
            let stepName = await log.getCurrentStepName()
            if (options.stepName !== stepName) {
              continue
            }
          }
          
          if (log.type === 'Annotation.floatWidget') {
            log.log.anchorPositions.forEach(a => {
              let id = a.paragraph_id
              if (!id) {
                return false
              }
              id = id.slice(id.lastIndexOf('-') + 1)
              id = Number(id)
              //console.log(id)
              output.push(id)
            })
          }
          else if (log.type === 'Annotation.create') {
            let annotationType = log.type
            if (annotationType === 'SectionMainIdea') {
              continue
            }
            
            log.log.anchorPositions.forEach(a => {
              let seqID = a.seq_id
              if (seqID !== undefined) {
                output.push(seqID)
              }
            })
          }
        }
        //console.log('output', JSON.stringify(output) )
        return output
      })  // return await Cache.rememberWait([webpage, this], cacheKey, async () => {
    }
  } // register (Model) {
}

module.exports = UserReadingActivityLog
