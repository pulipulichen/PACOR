'use strict'

const Helpers = use('Helpers')
const Env = use('Env')

const User = use('App/Models/User')
const DateHelper = use('App/Helpers/DateHelper')
//const Message = use('App/Models/Message')

class File {
  
  /**
   * 編輯器插入圖片用的
   * @param {type} request
   * @param {type} webpage
   * @param {type} user
   * @returns {Number|imageURL|Boolean}
   */
  async upload ({request, webpage, user}) {
    let userId = user.id
    
    const profilePic = request.file('file', {
      types: ['image'],
      size: '10mb'
    })

    if (profilePic === null) {
      return 0
    }

    var name = `${DateHelper.getTime()}.${profilePic.subtype}`
    await profilePic.move(Helpers.publicPath(`uploads/${webpage.primaryKeyValue}/${userId}`), {
      name: name,
      overwrite: true,
    },)

    if (!profilePic.moved()) {
      return profilePic.error()
    }
    
    // -------------------------
    
    if (userId === false) {
      return false
    }
    
    // const appSecret = Env.get('APP_SECRET')
    //let imageURL = `${Env.get('APP_URL')}/uploads/${webpage.primaryKeyValue}/${userId}/${name}`
    let baseURL = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + Env.get('PORT')
    let imageURL = `${baseURL}/uploads/${webpage.primaryKeyValue}/${userId}/${name}`
    
    //console.log(imageURL)
    return imageURL
  }
}

module.exports = File
