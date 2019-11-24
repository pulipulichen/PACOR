'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 

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

        output.userJSON = mockMyWords
        if (userID) {
          output.otherJSON = mockOtherWords
        }
        else {
          output.allJSON = mockAllWords
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
        let output = {}

        output.userJSON = mockMyWords
        if (userID) {
          output.otherJSON = mockOtherWords
        }
        else {
          output.allJSON = mockAllWords
        }

        return output
      })
    }
    
  } // register (Model) {
}

module.exports = AnnotationNoteUserFilter
