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
    
    Model.getInit = async function (webpage, user, options) {
      let {
        userID
      } = options
      
      let cacheKey = Cache.key(`getInit`, userID)
      return await Cache.rememberWait([webpage, user, this], cacheKey, 1, async () => {
        let output = {}

        output.userJSON = await this.getUserWords(webpage, user, {
          userID: user.primaryKeyValue
        })
        
        let result = await this.getUserWords(webpage, user, options)
        if (userID) {
          output.otherJSON = result
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
      
      let cacheKey = Cache.key(`getUserWords`, userID)
      return await Cache.rememberWait([webpage, user, this], cacheKey, 1, async () => {
        
        let notes = await AnnotationNoteModel
                .query()
                .whereHas('annotation', async (builder) => {
                  builder.where('deleted', false)
                  builder.where('webpage_id', webpage.primaryKeyValue)
                  
                  if (userID) {
                    builder.where('user_id', userID)
                  }
                  else {
                    // 搜尋該組的
                    let userIdList = await user.getUserIDsInGroup(webpage, true)
                    builder.whereIn('user_id', userIdList)
                  }
                })
                .select('properties')
                .fetch()
        
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
    
  } // register (Model) {
}

module.exports = AnnotationNoteUserFilter
