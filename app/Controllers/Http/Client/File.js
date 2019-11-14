'use strict'

const Helpers = use('Helpers')
const Env = use('Env')

const User = use('App/Models/User')
const Message = use('App/Models/Message')

class File {
  
  async upload ({request, webpage, user}) {
    let userId = user.id
    
    const profilePic = request.file('file', {
      types: ['image'],
      size: '10mb'
    })

    if (profilePic === null) {
      return 0
    }

    var name = `${new Date().getTime()}.${profilePic.subtype}`
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
    let imageURL = `${Env.get('APP_URL')}/uploads/${webpage.primaryKeyValue}/${userId}/${name}`
    return imageURL
  }
}

module.exports = File
