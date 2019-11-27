'use strict'

const Cache = use('Cache')
const {HttpException} = use('@adonisjs/generic-exceptions')
const TokenizationHelper = use('App/Helpers/TokenizationHelper')

class AnnotationNote {

  register(Model) {

    Model.prototype.getNoteSummary = async function (webpage, user, options) {
      let cacheKey = Cache.key('getNoteSummary')
      return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
        let notes = await this.notes().fetch()
        //console.log('getNoteSummary 1', notes.size())
        let note = ''
        for (let i = 0; i < notes.size(); i++) {
          if (note !== '') {
            note = note + ' '
          }
          note = note + notes.nth(i).note
        }

        note = TokenizationHelper.htmlToText(note)
        if (note.length > 20) {
          note = note.slice(0, 20) + '...'
        }
        //console.log('getNoteSummary 9', note)
        return note
      })
    }

  } // register (Model) {
}

module.exports = AnnotationNote
