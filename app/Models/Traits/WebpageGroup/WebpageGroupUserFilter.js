'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const UserModel = use('App/Models/User')
const AnnotationNoteModel = use('App/Models/AnnotationNote')

class WebpageGroupUserFilter {

  register(Model) {
    
    Model.getInit = async function (webpage, user, options) {
      //throw new Error('getInit')
      
      //let cacheKey = Cache.key('getInit', options)
      //return await Cache.rememberWait([webpage, user, 'WebpageGroup'], cacheKey, async () => {
        // 取得這一組裡面的成員
        
        //console.log('getInit', 0)

        // 這包含了自己
        let userIDs = await user.getUserIDsInGroup(webpage, true)
        
        //console.log('getInit', 1, userIDs)
        
        let users = await UserModel
                .query()
                .whereIn('id', userIDs)
                .setVisible(['id', 'username', 'display_name', 'role', 'avatar_url'])
                .fetch()
        
        //console.log('getInit', 2)
                
        // ----------------
        // 分類身份

        let me = []
        let readersAlready = []
        let readerInstancesAlready = []
        let readersNotReady = []
        let admins = []

        // -----------------
        let currentTime = (new Date()).getTime()

        for (let i = 0; i < users.size(); i++) {
          let u = users.nth(i)
          
          let isReady = true
          
          // 先看一下這個人所在的階段，如果不能合作，那就...排除掉他
          if (u.role === 'reader') {
            let isEnableCollaboration = await u.isEnableCollaboration(webpage)
            if (isEnableCollaboration === false) {
              isReady = false
            }
          }
          
          // 直接在這邊做查詢
          //console.log('getInit', 2, i, 1, u)
          
          let annotationTypes = await u.getAnnotationTypes(webpage)
          
          
          let stepDuration
          
          if (isReady === true && u.role === 'reader') {
            let stepStartTime = await u.getCurrentReadingProgressStepStartTime(webpage)
            //console.log(stepStartTime)
            stepDuration = currentTime - stepStartTime
          }
          
          //console.log('getInit', 2, i, 2)
          
          let userJSON = u.toJSON()
          userJSON.annotationTypes = annotationTypes
          userJSON.isReady = isReady
          userJSON.stepDuration = stepDuration
          if (user.id === userJSON.id) {
            // 排除掉自己
            me.push(userJSON)
          }
          else if (userJSON.role === 'reader') {
            if (isReady === true) {
              readersAlready.push(userJSON)
              readerInstancesAlready.push(u)
            }
            else {
              readersNotReady.push(userJSON)
            }
          }
          else {
            admins.push(userJSON)
          }
        }
        
        
        
        //console.log('getInit', 3)
        
        // ------------------
        // 為readers排序
        
        await sortAlreadyReaders(webpage, user, readersAlready, readerInstancesAlready)
        

        // ------------------
        // 合併
        
        users = readersAlready
        users = users.concat(readersNotReady)
        users = users.concat(admins)
        users = users.concat(me)

        return users
      //})  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
    let sortAlreadyReaders = async function (webpage, user, readersJSON, readersInstance) {
      let myWords = await AnnotationNoteModel.getUserWords(webpage, user, {
        userID: user.primaryKeyValue
      })
      
      let userIDList = readersJSON.map(reader => reader.id)
      let interactTimeList = await user.getRecentInteractTime(webpage, {
        userIDList
      })
      
      // 先把每個讀者的資料湊齊
      for (let i = 0; i < readersInstance.length; i++) {
        let reader = readersInstance[0]
        let words = await AnnotationNoteModel.getUserWords(webpage, user, {
          userID: reader.primaryKeyValue
        })
        
        let wordsCountNotUsed = AnnotationNoteModel.calculateWordsCountNotUsed(myWords, words)
        readersJSON[i].wordsCountNotUsed = wordsCountNotUsed
        
        readersJSON[i].interactTime = interactTimeList[i]
      }
      
      // ----------------------------------
      
      readersJSON.sort(function(a, b){
        if (a.interactTime && b.interactTime) {
          return b.interactTime - a.interactTime
        }
        else {
          if (a.wordsCountNotUsed !== b.wordsCountNotUsed) {
            return b.wordsCountNotUsed - a.wordsCountNotUsed
          }
          else {
            return b.stepDuration - a.stepDuration
          }
        }
      })
      
      //console.log(readersJSON)
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupUserFilter
