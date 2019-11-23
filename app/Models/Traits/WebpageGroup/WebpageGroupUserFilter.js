'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const UserModel = use('App/Models/User')

class WebpageGroupUserFilter {

  register(Model) {
    
    Model.getInit = async function (webpage, user, options) {
      //throw new Error('getInit')
      
      let cacheKey = Cache.key('method')
      return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
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
        let readers = []
        let admins = []

        // -----------------

        for (let i = 0; i < users.size(); i++) {
          let u = users.nth(i)
          
          // 先看一下這個人所在的階段，如果不能合作，那就...排除掉他
          if (u.role === 'reader') {
            let isEnableCollaboration = await u.isEnableCollaboration(webpage)
            if (isEnableCollaboration === false) {
              continue
            }
          }
          
          // 直接在這邊做查詢
          //console.log('getInit', 2, i, 1, u)
          
          let annotationTypes = await u.getAnnotationTypes(webpage)
          
          //console.log('getInit', 2, i, 2)
          
          u = u.toJSON()
          u.annotationTypes = annotationTypes
          if (user.id === u.id) {
            // 排除掉自己
            me.push(u)
          }
          else if (u.role === 'reader') {
            readers.push(u)
          }
          else {
            admins.push(u)
          }
        }
        
        //console.log('getInit', 3)
        
        // ------------------
        // 為readers排序
        
        
        // 先簡單地按照字母排序好了
        readers.sort(function(b, a){
          a = a.username.toLowerCase();
          b = b.username.toLowerCase();

          return (a < b) ? -1 : (a > b) ? 1 : 0
        })

        // ------------------
        // 合併
        
        users = me.concat(readers.concat(admins))

        return users
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupUserFilter
