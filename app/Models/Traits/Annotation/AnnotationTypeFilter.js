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
            
      return await Cache.rememberWait([webpage, user, this], cacheKey, cacheMinute, async () => {
        
        if (focusUserID) {
          let isFocusUserInMyGroup = await user.isUserInMyGroup(webpage, focusUserID)
          if (isFocusUserInMyGroup === false) {
            throw new HttpException(`This user is not in your group`, 403)
          }
        }
        
        let types = await user.getCurrentReadingProgressStepAnnotationTypes(webpage)
        
        let myCounts = await user.getAnnotationTypes(webpage)
        let othersCounts
        
        if (focusUserID) {
          let otherUser = await UserModel.find(focusUserID)
          othersCounts = await otherUser.getAnnotationTypes(webpage)
        }
        else {
          othersCounts = await webpage.getAnnotationTypes()
        }
        
        // ------------------
        
        let output = types.map(type => {
          let myCount = myCounts[type]
          if (!myCount) {
            myCount = 0
          }
          
          let othersCount = othersCounts[type]
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
