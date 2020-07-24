'use strict'

const Cache = use('Cache')
const {HttpException} = use('@adonisjs/generic-exceptions')
const TokenizationHelper = use('App/Helpers/TokenizationHelper')
const StringHelper = use('App/Helpers/StringHelper')

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
    
    Model.prototype.getAllNote = function () {
      let noteInstances = this.getRelated('notes')
      
      let notes = []
      for (let j = 0; j < noteInstances.size(); j++) {
        let noteInstance = noteInstances.nth(j)
        let n = noteInstance.note
        n = StringHelper.htmlToText(n, true)
        n = n.trim()
        if (n !== '') {
          notes.push({
            id: noteInstance.primaryKeyValue,
            note: n
          })
        }
      }

      notes.sort((a, b) => {
        return a.id - b.id
      })

      return notes.map(n => n.note).join(' / ')
    }

  } // register (Model) {
}

module.exports = AnnotationNote
