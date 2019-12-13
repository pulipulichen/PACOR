'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const AnnotationNoteModel = use('App/Models/AnnotationNote')

let mockAllWords = {
  Lorem: 13,
  Ipsum: 10.5,
  Dolor: 9.4,
  Sit: 8,
  Amet: 6.2,
  Consectetur: 5,
  Adipiscing: 5
}

let mockOtherWords = {
  Lorem: 13,
  Ipsum: 10.5,
  Sit: 8,
  Amet: 6.2,
  Adipiscing: 5
}

let mockMyWords = {
  Lorem: 13,
  Amet: 6.2,
  Adipiscing: 5
}

class AnnotationNoteUserFilter {

  register(Model) {
    
    Model.getUserChart = async function (webpage, user, options) {
      let {
        userID
      } = options
      
      let cacheKey = Cache.key(`AnnotationNote.getUserChart`, userID)
      return await Cache.rememberWait([webpage, user], cacheKey, 1, async () => {
        let output = {}

        output.userJSON = await this.getUserWords(webpage, user, {
          userID: user.primaryKeyValue
        })
        
        let result = await this.getUserWords(webpage, user, options)
        if (userID) {
          output.othersJSON = result
        }
        else {
          output.allJSON = result
        }

        return output
      })
    }
    
    Model.getUserWords = async function (webpage, user, options) {
      let {
        userID
      } = options
      
      let cacheKey = Cache.key(`AnnotationNote.getUserWords`, userID)
      return await Cache.rememberWait([webpage, user], cacheKey, 1, async () => {
        
        
        let query = AnnotationNoteModel
                .query()
                .innerJoin('annotations', 'annotations.id', 'annotation_notes.annotation_id')
                .where('annotations.deleted', false)
                .where('annotations.webpage_id', webpage.primaryKeyValue)
                .select('annotation_notes.properties')
                .limit(500)
                .orderBy('annotations.updated_at_unixms', 'desc')
        
        if (userID) {
          query.where('annotations.user_id', userID)
        }
        else if (user.isAdmin()) {
          // 沒有限制
          let peerIDList = await user.getPeersIDList(webpage)
          query.whereIn('user_id', peerIDList)
        }
        else {
          // 搜尋該組的
          let isInAnonymousGroup = await user.isInAnonymousGroup(webpage)
          
          if (isInAnonymousGroup === false) {
            let userIdList = await user.getUserIDsInGroup(webpage, true)
            //console.log('getUserWords', 'all', userIdList)
            query.whereIn('annotations.user_id', userIdList)
          }
          else {
            let userList = await webpage.getUserIDsInGroups()
            if (userList !== null) { 
              query.whereNotIn('annotations.user_id', userList)
            }
          }
        }
        
        //console.log(query.toSQL())
        
        let notes = await query.fetch()
        let words = {}
        
        for (let i = 0; i < notes.size(); i++) {
          let properties = notes.nth(i).properties
          
          if (!properties || !properties.wordFrequency) {
            continue
          }
          
          Object.keys(properties.wordFrequency).forEach(word => {
            let count = properties.wordFrequency[word]
            
            if (!words[word]) {
              words[word] = 0
            }
            words[word] = words[word] + count
          })
        }
        
        return words
      })
    }
    
    /**
     * 計算對方用了你沒用過的文字的數量
     * 
     * 越大，表示兩者越遠
     * @param {JSON} baseWords
     * @param {JSON} targetWords
     * @returns {Number}
     */
    Model.calculateWordsCountNotUsed = function (baseWords, targetWords) {
      let result = 0
      
      Object.keys(targetWords).forEach(word => {
        let targetCount = targetWords[word]
        
        if (typeof(baseWords[word]) === 'number') {
          targetCount = targetCount - baseWords[word]
        }
        
        if (targetCount > 0) {
          result = result + targetCount
        }
      })
      
      return result
    }
    
    /**
     * 計算對方用了你也用過的文字的數量
     * 
     * 越大，表示兩者越相近
     * @param {JSON} baseWords
     * @param {JSON} targetWords
     * @returns {Number}
     */
    Model.calculateWordsCountHasBeenUsed = function (baseWords, targetWords) {
      let result = 0
      
      Object.keys(targetWords).forEach(word => {
        if (typeof(baseWords[word]) !== 'number') {
          return null
        }
        
        let targetCount = targetWords[word]
        let baseCount = baseWords[word]
        
        result = result + Math.min(targetCount, baseCount)
      })
      
      return result
    }
    
  } // register (Model) {
}

module.exports = AnnotationNoteUserFilter
