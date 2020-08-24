'use strict'

const Cache = use('Cache')
const {HttpException} = use('@adonisjs/generic-exceptions')

class AnnotationInteraction {

  register(Model) {

    Model.prototype.getInteractUserList = async function () {
      let cacheKey = Cache.key('getInteractUserList')
      return await Cache.rememberWait([this, 'Annotation'], cacheKey, async () => {
        let userIDList = []
        
        let comments = await this.comments()
                .with('rates')
                .fetch()
        
        for (let c = 0; c < comments.size(); c++) {
          let comment = comments.nth(c)
          
          if (comment.deleted === true) {
            continue
          }
          
          userIDList.push(comment.user_id)
          
          let rates = await comment.rates().fetch()
          for (let r = 0; r < rates.size(); r++) {
            let rate = rates.nth(r)
            
            if (rate.deleted === true) {
              continue
            }
            
            userIDList.push(rate.user_id)
          }
        }
        
        return userIDList
      })
    }
    
    
    Model.prototype.getInteractUserUniqueList = async function (webpage, user, options) {
      let cacheKey = Cache.key('getInteractUserUniqueList')
      return await Cache.rememberWait([this, 'Annotation'], cacheKey, async () => {
        let userIDList = await this.getInteractUserList(webpage, user, options)
        return userIDList.filter((value, index, self) => {
          return self.indexOf(value) === index
        })
      })
    }
  } // register (Model) {
}

module.exports = AnnotationInteraction
