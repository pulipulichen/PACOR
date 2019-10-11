'use strict'

const Helpers = use('Helpers')
const Env = use('Env')

const User = use('App/Models/User')
const Message = use('App/Models/Message')

class MessageController {
  /**
   * 列出最近10則訊息
   */
  async list ({ origin }) {
    const messages = await Message.list(origin, 10)
    return messages.toJSON().reverse()
  }
  
  async syncList ({ request, auth, origin }) {
    const query = request.get()
    let lastUpdateTimestamp = query.lastUpdateTimestamp
    if (isNaN(lastUpdateTimestamp) === true) {
      return []
    }
    lastUpdateTimestamp = parseInt(lastUpdateTimestamp, 10)
    
    let user = await auth.getUser()
    let userId = user.id
    
    let messages = await Message
            .query()
            .where('user_id', '<>', userId)
            .where('timestamp', '>', lastUpdateTimestamp)
            .with('user')
            .whereHas('user', (builder) => {
              builder.where('origin', origin)
            })
            .fetch()
    
    return messages.toJSON()    
  }
  async insert ({ request, auth }) {
    let user = await auth.getUser()
    
    const query = request.post()
    if (typeof(query.message) !== 'string') {
      return false
    }
    
    let userId = user.id
    if (userId === false) {
      return false
    }
    
    let message = new Message()
    message.message = query.message
    await user.messages().save(message)
    return message.timestamp
  }
  
  async upload ({ request, auth }) {
    let user = await auth.getUser()
    let userId = user.id
    
    const profilePic = request.file('message_picture', {
      types: ['image'],
      size: '2mb'
    })

    if (profilePic === null) {
      return 'no-pic'
    }

    var name = `${new Date().getTime()}.${profilePic.subtype}`
    await profilePic.move(Helpers.publicPath(`uploads/${userId}`), {
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
    let imageURL = `${Env.get('APP_URL')}/uploads/${userId}/${name}`
    
    let message = new Message()
    message.message = `<a href="${imageURL}" target="_blank"><img src="${imageURL}" /></a>`
    await user.messages().save(message)
    return {
      url: imageURL,
      timestamp: message.timestamp
    }
  }
}

module.exports = MessageController
