'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const UserModel = use('App/Models/User')

const Config = use('Config')
const Cache = use('Cache')

const { HttpException } = use('@adonisjs/generic-exceptions') 
const dayjs = use('dayjs')
const SpreadsheetHelper = use('App/Helpers/SpreadsheetHelper')

class WebpageExport {
  
  async allData ({request, response, auth}) {
    let { webpageID } = request.all()
    
    let webpage = await WebpageModel.find(webpageID)
    
    let data = {
      /*
      // We will make a Workbook contains 2 Worksheets
      'animals': [
                  {"name": "cat", "category": "animal"}
                  ,{"name": "dog", "category": "animal"}
                  ,{"name": "pig", "category": "animal"}
                ],
      'pokemons': [
                  {"name": "pikachu", "category": "pokemon"}
                  ,{"name": "Arbok", "category": "pokemon"}
                  ,{"name": "Eevee", "category": "pokemon"}
                ]
       */
    }
    
    data.Questionnaire = await webpage.exportQuestionnaire()
    data.SectionNote = await webpage.exportSectionNote()
    data.Annotation = await webpage.exportAnnotation()
    data.Comment = await webpage.exportComment()
    data.Rate = await webpage.exportRate()
    data.Interact = this._calcInteractTo(data.Comment, data.Rate)
    //console.log(data.Annotation)
    
    let filename = `webpage_` + webpageID + `_all_${dayjs().format('YYYYMMDD-HHmm')}.ods`
    return SpreadsheetHelper.download(data, filename, response)
  }
  
  _calcInteractTo (comment, rate) {
    let users = {}
    //console.log(comment)
    comment = comment.filter(c => (c.deleted === false) )
    rate = rate.filter(r => (r.deleted === false) )
    
    let initUser = (username) => {
      if (typeof(users[username]) === 'undefined') {
        users[username] = {
          commentTo: 0,
          rateTo: 0,
          totalTo: 0,
          excludeAnnotationID: []
        }
      }
    }
    
    // ----------------
    
    comment.sort((a, b) => {
      if (a.annotation_id !== b.annotation_id) {
        return a.annotation_id - b.annotation_id
      }
      else if (a.user_id !== b.user_id) {
        return a.user_id - b.user_id
      }
    })
    
    let lastAnnotationID = null
    let lastUserID = null
    
    comment.forEach(c => {
      if (lastAnnotationID === null 
              || lastAnnotationID !== c.annotation_id) {
        lastAnnotationID = c.annotation_id
      }
      else {
        if (lastUserID === null 
                || lastUserID !== c.user_id) {
          lastUserID = c.user_id
        }
        else {
          return false
        }
      }
      
      initUser(c.username)
      if (users[c.username].excludeAnnotationID.indexOf(c.annotation_id) === -1) {
        users[c.username].commentTo++
        users[c.username].totalTo++
        users[c.username].excludeAnnotationID.push(c.annotation_id)
      }
    })
    
    // ----------------
    
    rate.forEach(r => {
      initUser(r.username)
      
      users[r.username].rateTo++
      if (r.anchor === 'annotation' && users[r.username].excludeAnnotationID.indexOf(r.anchor_id) === -1) {
        users[r.username].totalTo++
        users[r.username].excludeAnnotationID.push(r.anchor_id)
      }
    })
    
    // ----------------
    
    let output = []
    
    Object.keys(users).forEach(user => {
      output.push({
        username: user,
        commentTo: users[user].commentTo,
        rateTo: users[user].rateTo,
        totalTo: users[user].totalTo
      })
    })
    
    output.sort((a, b) => {
      let nameA = a.username.toLowerCase()
      let nameB = b.username.toLowerCase()
      if (nameA < nameB) {
        return -1
      }
      else {
        return 1
      }
    }) 
    //console.log(users)
    return output
  }
  
  async groupIndicators ({request, response, auth}) {
    let { webpageID } = request.all()
    
    let webpage = await WebpageModel.find(webpageID)
    let groups = await webpage.groups().fetch()
    
    let options = {
      userFilter: 'onlyCompleted'
    }
    
    let indicators = []
    for (let i = 0; i < groups.size(); i++) {
      let group = groups.nth(i)
      
      let excluded = await group.getAttribute('excluded', true)
      if (excluded === true) {
        continue
      }
      
      let indicator = await group.calcIndicators(options)
      
      indicators.push(indicator)
    }
    
    return indicators
  }
}

module.exports = WebpageExport
