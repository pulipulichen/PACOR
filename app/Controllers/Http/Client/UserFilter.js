'use strict'

const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const Cache = use('Cache')
const Config = use('Config')

const WebpageGroup = use ('App/Models/WebpageGroup')
const AnnotationNote = use ('App/Models/AnnotationNote')

class UserFilter {
  
  async initPeerList ({ request, webpage, user }) {
    let options = request.all()
    webpage.log(user, 'UserFilter.initPeerList', options)
    return await WebpageGroup.getPeerList(webpage, user, options)
  }
  
  async initUserChart ({ request, webpage, user }) {
    let options = request.all()
    return await AnnotationNote.getUserChart(webpage, user, options)
  }
  
  async getUserWords ({ request, webpage, user }) {
    let options = request.all()
    webpage.log(user, 'UserFilter.getUserWords', options)
    return await AnnotationNote.getUserWords(webpage, user, options)
  }
}

module.exports = UserFilter