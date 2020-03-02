'use strict'

//const HttpException = use('HttpException')
const {HttpException} = use('@adonisjs/generic-exceptions') 
const AnnotationModel = use('App/Models/Annotation')
const UserModel = use('App/Models/User')

const Cache = use('Cache')
const Config = use('Config')



class AnnotationTypeFilter {

  register(Model) {
    
    Model.getAnnotationTypeFilterInit = async function (webpage, user, query) {
      //throw new HttpException('@TODO')
      //return []
      
      let {
        focusUserID
      } = query
      
      let cacheKey = Cache.key(`Annotation.getAnnotationTypeFilterInit`, query)

      //console.log(cacheKey)
      
      let cacheMinute = 2
      //cacheMinute = 0.001 // for test
            
      return await Cache.rememberWait([webpage, user], cacheKey, cacheMinute, async () => {
        
        if (focusUserID) {
          let isFocusUserInMyGroup = await user.isUserInMyGroup(webpage, focusUserID)
          if (isFocusUserInMyGroup === false) {
            throw new HttpException(`This user is not in your group`, 403)
          }
        }
        
        let types = await user.getStepHighlightAnnotationTypes(webpage)
        if (types.length === 0) {
          throw new Error('No types')
          return []
        }
        
        //types = types.filter(type => (type !== 'SectionMainIdea'))
        
        let myCounts = await user.getHighlightAnnotationTypes(webpage)
        let othersCounts = {}
        
        if (typeof(focusUserID) === 'string'
                && !isNaN(focusUserID)) {
          focusUserID = parseInt(focusUserID, 10)
        } 
        
        //console.log(focusUserID, user.primaryKeyValue)
        if (focusUserID && focusUserID !== user.primaryKeyValue) {
          let otherUser = await UserModel.find(focusUserID)
          othersCounts = await otherUser.getAnnotationTypes(webpage)
        }
        else {
          othersCounts = await user.getWebpageHighlightAnnotationTypes(webpage)
        }
        
        // ---------------
        
        let myCountsJSON = {}
        myCounts.forEach(row => {
          myCountsJSON[row.type] = row.count
        })
        
        let othersCountsJSON = {}
        othersCounts.forEach(row => {
          othersCountsJSON[row.type] = row.count
        })
        
        // ------------------
        
        let output = types.map(type => {
          let myCount = myCountsJSON[type]
          if (!myCount) {
            myCount = 0
          }
          
          let othersCount = othersCountsJSON[type]
          if (!othersCount) {
            othersCount = 0
          }
          
          return {
            type,
            myCount,
            othersCount
          }
        })
        
        return output
      })
    }
    
  } // register (Model) {
}

module.exports = AnnotationTypeFilter
