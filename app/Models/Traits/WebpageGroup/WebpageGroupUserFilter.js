'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const UserModel = use('App/Models/User')

class WebpageGroupUserFilter {

  register(Model) {
    
    Model.getInit = async function (webpage, user, options) {
      throw new Error('getInit')
      
      let cacheKey = Cache.key('method')
      return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
        // 取得這一組裡面的成員

        // 這包含了自己
        let userIDs = await user.getUserIDsInGroup(webpage, true)
        
        let users = await UserModel
                .query()
                .whereIn('id', userIDs)

        // ----------------
        // 分類身份

        let me = []
        let readers = []
        let admins = []

        // -----------------

        users.forEach(u => {
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
        })
        
        // ------------------
        // 為readers排序
        
        // 先簡單地按照字母排序好了
        

        // ------------------
        // 取得 所有人的標註類型統計資料
        
        users = me.concat(readers.concat(admins))

        return users
      })  // return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = WebpageGroupUserFilter
