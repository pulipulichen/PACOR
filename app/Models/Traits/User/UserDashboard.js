'use strict'

const Cache = use('Cache')

const AnnotationModel = use('App/Models/Annotation')
const StringHelper = use('App/Helpers/StringHelper')
const AnnotationCommentModel = use('App/Models/AnnotationComment')

const AnnotationRateModel = use('App/Models/AnnotationRate')
const AnnotationCommentRateModel = use('App/Models/AnnotationCommentRate')

const DatabaseHelper = use('App/Helpers/DatabaseHelper')

class UserDashboard {

  register(Model) {
    
    Model.prototype.getAnnotationsInStep = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getAnnotationsInStep`, start_timestamp, end_timestamp)
      
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let query = AnnotationModel
                .query()
                .with('notes')
                .where('deleted', false)
                .whereNot('type', 'SectionMainIdea')
                .where('user_id', this.primaryKeyValue)
                .where('webpage_id', webpage.primaryKeyValue)

        if (typeof(start_timestamp) === 'number') {
          query.where('created_at_unixms', '>=', start_timestamp)
        }

        if (typeof(end_timestamp) === 'number') {
          query.where('created_at_unixms', '<=', end_timestamp)
        }

        let result = await query.fetch()
        return result.toJSON()
      })
      return output
    }
    
    Model.prototype.getSectionAnnotationsInStep = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getSectionAnnotationsInStep`, start_timestamp, end_timestamp)
      
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let query = AnnotationModel
                .query()
                .with('notes')
                .with('anchorPositions')
                .where('deleted', false)
                .where('type', 'SectionMainIdea')
                .where('user_id', this.primaryKeyValue)
                .where('webpage_id', webpage.primaryKeyValue)

        if (typeof(start_timestamp) === 'number') {
          query.where('created_at_unixms', '>=', start_timestamp)
        }

        if (typeof(end_timestamp) === 'number') {
          query.where('created_at_unixms', '<=', end_timestamp)
        }

        let result = await query.fetch()
        return result.toJSON()
      })
      return output
    }
    
    Model.prototype.countAnnotations = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.countAnnotations`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let annotations = await this.getAnnotationsInStep(webpage, start_timestamp, end_timestamp)
        //console.log(annotations)
        return annotations.length
      })
      return output
    }
    
    Model.prototype.countAnnotationNoteWords = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.countAnnotationNoteWords`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let wordCount = 0
        
        let annotations = await this.getAnnotationsInStep(webpage, start_timestamp, end_timestamp)
        //console.log(annotations.length)
        annotations.forEach((annotation) => {
          annotation.notes.forEach((note) => {
            let noteText = note.note
            noteText = StringHelper.htmlToText(noteText, true)
            wordCount = wordCount + StringHelper.countWords(noteText)
          })
        })
        
        return wordCount
      })
      return output
    }
    
    Model.prototype.countAnnotationTypes = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.countAnnotationTypes`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let types = {}
        
        let annotations = await this.getAnnotationsInStep(webpage, start_timestamp, end_timestamp)
        annotations.forEach((annotation) => {
          let type = annotation.type
          
          if (typeof(types[type]) !== 'number') {
            types[type] = 0
          }
          types[type]++
        })
        
        return types
      })
      return output
    }
    
    
    Model.prototype.getSectionNotes = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getSectionNotes`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let notes = []
        
        let annotations = await this.getSectionAnnotationsInStep(webpage, start_timestamp, end_timestamp)
        annotations.forEach((annotation) => {
          let sectionID = annotation.anchorPositions[0].section_id
          notes[sectionID] = annotation.notes[0].note
        })
        
        return notes
      })
      return output
    }
    
    
    // -----------------------------------------
    
    Model.prototype.getCommentsInStep = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getCommentsInStep`, start_timestamp, end_timestamp)
      
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let query = AnnotationCommentModel
                .query()
                .whereHas('annotation', (builder) => {
                  builder.where('deleted', false)
                         .where('webpage_id', webpage.primaryKeyValue)
                }, '>', 0)
                .with('annotation', (builder) => {
                  builder.with('user')
                })
                .where('deleted', false)
                .where('user_id', this.primaryKeyValue)
                //.where('webpage_id', webpage.primaryKeyValue)

        if (typeof(start_timestamp) === 'number') {
          query.where('created_at_unixms', '>=', start_timestamp)
        }

        if (typeof(end_timestamp) === 'number') {
          query.where('created_at_unixms', '<=', end_timestamp)
        }

        let result = await query.fetch()
        let resultJSON = result.toJSON()
        
        resultJSON.sort((a, b) => {
          if (a.annotation.id !== b.annotation.id) {
            return a.annotation.id - b.annotation.id
          }
        })
        
        return resultJSON
      })
      return output
    }
    
    Model.prototype.getInteracts = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getInteracts`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let interactTo = {}
        
        let initUser = (user) => {
          if (!interactTo[user.id]) {
            interactTo[user.id] = {
              avatar_url: user.avatar_url,
              name: user.display_name,
              count: 0,
              annotationIDList: []
            }
          }
        }
        
        // ----------------------------------------------
        
        let comments = await this.getCommentsInStep(webpage, start_timestamp, end_timestamp)
        
        let lastAnnotationID
        
        comments.forEach((comment) => {
          let annotationID = comment.annotation.id
          if (!lastAnnotationID || lastAnnotationID !== annotationID) {
            lastAnnotationID = annotationID
          }
          else {
            return false
          }
          
          //console.log(JSON.stringify(comment, null, 2))
          let user = comment.annotation.user
          
          initUser(user)
          if (interactTo[user.id].annotationIDList.indexOf(annotationID) === -1) {
            interactTo[user.id].count++
            interactTo[user.id].annotationIDList.push(annotationID)
          }
        })
        
        // ------------------------------------------
        
        let annotationRates = await this.getAnnotationRatesInStep(webpage, start_timestamp, end_timestamp)
        console.log(annotationRates)
        annotationRates.forEach((rate) => {
          let user = rate.annotation.user
          let annotationID = rate.annotation.id

          initUser(user)
          if (interactTo[user.id].annotationIDList.indexOf(annotationID) === -1) {
            interactTo[user.id].count++
            interactTo[user.id].annotationIDList.push(annotationID)
          }
        })
        
        // ------------------------------------------
        
        let commentRates = await this.getAnnotationCommentRatesInStep(webpage, start_timestamp, end_timestamp)
        //console.log(commentRates)
        commentRates.forEach((rate) => {
          let user = rate.comment.user
          initUser(user)
          interactTo[user.id].count++
        })
        
        // ------------------------------------------
        
        return interactTo
      })
      return output
    }
    
    Model.prototype.getComments = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getComments`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let commentTo = {}
        
        let comments = await this.getCommentsInStep(webpage, start_timestamp, end_timestamp)
        
        let lastAnnotationID
        
        comments.forEach((comment) => {
          let annotationID = comment.annotation.id
          if (!lastAnnotationID || annotationID !== comment.annotation.id) {
            lastAnnotationID = comment.annotation.id
          }
          else {
            return false
          }
          
          //console.log(JSON.stringify(comment, null, 2))
          let user = comment.annotation.user
          
          if (!commentTo[user.id]) {
            commentTo[user.id] = {
              avatar_url: user.avatar_url,
              name: user.display_name,
              count: 0
            }
          }
          commentTo[user.id].count++
        })
        
        return commentTo
      })
      return output
    }
    
    // -----------------------------------------
    
    Model.prototype.getCommentedInStep = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getCommentedInStep`, start_timestamp, end_timestamp)
      
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let query = AnnotationCommentModel
                .query()
                .whereHas('annotation', (builder) => {
                  builder.where('deleted', false)
                         .where('user_id', this.primaryKeyValue)
                         .where('webpage_id', webpage.primaryKeyValue)
                }, '>', 0)
                //.with('annotation', (builder) => {
                  //builder.with('user')
                //})
                .with('user')
                .where('deleted', false)
                
                //.where('webpage_id', webpage.primaryKeyValue)

        if (typeof(start_timestamp) === 'number') {
          query.where('created_at_unixms', '>=', start_timestamp)
        }

        if (typeof(end_timestamp) === 'number') {
          query.where('created_at_unixms', '<=', end_timestamp)
        }

        let result = await query.fetch()
        let resultJSON = result.toJSON()
        
        resultJSON.sort((a, b) => {
          if (a.annotation.id !== b.annotation.id) {
            return a.annotation.id - b.annotation.id
          }
        })
        
        return resultJSON
      })
      return output
    }
    
    Model.prototype.getCommented = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getCommented`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let output = {}
        
        let comments = await this.getCommentedInStep(webpage, start_timestamp, end_timestamp)
        comments.forEach((comment) => {
          //console.log(JSON.stringify(comment, null, 2))
          let user = comment.user
          
          if (!output[user.id]) {
            output[user.id] = {
              avatar_url: user.avatar_url,
              name: user.display_name,
              count: 0
            }
          }
          output[user.id].count++
        })
        
        return output
      })
      return output
    }
    
    // -----------------------------------------------------------------
    
    Model.prototype.getAnnotationRatesInStep = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getAnnotationRatesInStep`, start_timestamp, end_timestamp)
      
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let query = AnnotationRateModel
                .query()
                .whereHas('annotation', (builder) => {
                  builder.where('deleted', false)
                         //.where('user_id', this.primaryKeyValue)
                         .where('webpage_id', webpage.primaryKeyValue)
                }, '>', 0)
                .with('annotation', (builder) => {
                  builder.with('user')
                })
                .where('user_id', this.primaryKeyValue)
                .where('deleted', false)
                //.select('EXTRACT(EPOCH FROM created_at) as created_at_unixms')
                
                //.where('webpage_id', webpage.primaryKeyValue)

        let offset = ((new Date()).getTimezoneOffset()) * 60 * 1000
        if (typeof(start_timestamp) === 'number') {
          query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000 ${offset}) >= ?`, [start_timestamp])
          //query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000) >= ?`, [start_timestamp])
        }

        if (typeof(end_timestamp) === 'number') {
          //query.where('EXTRACT(EPOCH FROM created_at)', '<=', end_timestamp)
          query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000 ${offset}) <= ?`, [end_timestamp])
          query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000) <= ?`, [end_timestamp])
        }

        //DatabaseHelper.consoleSQL(query)

        let result = await query.fetch()
        return result.toJSON()
      })
      return output
    }
    
    Model.prototype.getAnnotationCommentRatesInStep = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getAnnotationCommentRatesInStep`, start_timestamp, end_timestamp)
      
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let query = AnnotationCommentRateModel
                .query()
                .whereHas('comment', (builder) => {
                  builder.where('deleted', false)
                         //.where('user_id', this.primaryKeyValue)
                         .whereHas('annotation', (builder) => {
                           builder.where('webpage_id', webpage.primaryKeyValue)
                                  .where('deleted', false)
                         }, '>', 0)
                }, '>', 0)
                .with('comment', (builder) => {
                  builder.with('user')
                })
                .where('user_id', this.primaryKeyValue)
                .where('deleted', false)
                //.select('EXTRACT(EPOCH FROM created_at) as created_at_unixms')
                //.where('webpage_id', webpage.primaryKeyValue)

        let offset = ((new Date()).getTimezoneOffset()) * 60 * 1000
        if (typeof(start_timestamp) === 'number') {
          //query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000 ${offset} ) >= ?`, [start_timestamp])
          
          query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000 ) >= ?`, [start_timestamp])
        }

        if (typeof(end_timestamp) === 'number') {
          //query.where('EXTRACT(EPOCH FROM created_at)', '<=', end_timestamp)
          
          //query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000 ${offset}) <= ?`, [end_timestamp])
          query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000) <= ?`, [end_timestamp])
        }

        DatabaseHelper.consoleSQL(query)

        let result = await query.fetch()
        return result.toJSON()
      })
      return output
    }
    
    Model.prototype.getRates = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getRates`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let rates
        
        let annotationRates = {}
        let commentRates = {}
        
        rates = await this.getAnnotationRatesInStep(webpage, start_timestamp, end_timestamp)
        //console.log(rates.length)
        rates.forEach((rate) => {
          //console.log(JSON.stringify(comment, null, 2))
          let type = rate.type
          let user = rate.annotation.user
          
          if (!annotationRates[type]) {
            annotationRates[type] = {}
          }
          
          //console.log(type, user.id)
          
          if (!annotationRates[type][user.id]) {
            annotationRates[type][user.id] = {
              avatar_url: user.avatar_url,
              name: user.display_name,
              count: 0
            }
          }
          annotationRates[type][user.id].count++
        })
        //console.log(JSON.stringify(annotationRates, null, 2))
        
        // --------------------------------------------------------------
        
        rates = await this.getAnnotationCommentRatesInStep(webpage, start_timestamp, end_timestamp)
        rates.forEach((rate) => {
          //console.log(JSON.stringify(comment, null, 2))
          let type = rate.type
          let user = rate.comment.user
          let userID = user.id + ''
          
          if (!commentRates[type]) {
            commentRates[type] = {}
          }
          
          //console.log(type, userID)
          if (!commentRates[type][userID]) {
            commentRates[type][userID] = {
              avatar_url: user.avatar_url,
              name: user.display_name,
              count: 0
            }
          }
          commentRates[type][userID].count++
        })
        // --------------------------------------------------------------
        
        return {
          annotation: annotationRates,
          comment: commentRates
        }
      })
      return output
    }
    
    
    // -----------------------------------------------------------------
    
    Model.prototype.getAnnotationRatedInStep = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getAnnotationRatedInStep`, start_timestamp, end_timestamp)
      
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let query = AnnotationRateModel
                .query()
                .whereHas('annotation', (builder) => {
                  builder.where('deleted', false)
                         .where('user_id', this.primaryKeyValue)
                         .where('webpage_id', webpage.primaryKeyValue)
                }, '>', 0)
                //.with('annotation', (builder) => {
                //  builder.with('user')
                //})
                .with('rater')
                //.where('user_id', this.primaryKeyValue)
                .where('deleted', false)
                //.select('EXTRACT(EPOCH FROM created_at) as created_at_unixms')
                
                //.where('webpage_id', webpage.primaryKeyValue)

        let offset = ((new Date()).getTimezoneOffset()) * 60 * 1000
        if (typeof(start_timestamp) === 'number') {
          query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000 ${offset}) >= ?`, [start_timestamp])
        }

        if (typeof(end_timestamp) === 'number') {
          //query.where('EXTRACT(EPOCH FROM created_at)', '<=', end_timestamp)
          query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000 ${offset}) <= ?`, [end_timestamp])
        }

        //DatabaseHelper.consoleSQL(query)

        let result = await query.fetch()
        return result.toJSON()
      })
      return output
    }
    
    Model.prototype.getAnnotationCommentRatedInStep = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getAnnotationCommentRatedInStep`, start_timestamp, end_timestamp)
      
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let query = AnnotationCommentRateModel
                .query()
                .whereHas('comment', (builder) => {
                  builder.where('deleted', false)
                         .where('user_id', this.primaryKeyValue)
                         .whereHas('annotation', (builder) => {
                           builder.where('webpage_id', webpage.primaryKeyValue)
                         }, '>', 0)
                }, '>', 0)
                //.with('comment', (builder) => {
                //  builder.with('user')
                //})
                .where('user_id', this.primaryKeyValue)
                .with('user')
                .where('deleted', false)
                //.select('EXTRACT(EPOCH FROM created_at) as created_at_unixms')
                //.where('webpage_id', webpage.primaryKeyValue)

        let offset = ((new Date()).getTimezoneOffset()) * 60 * 1000
        if (typeof(start_timestamp) === 'number') {
          query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000 ${offset}) >= ?`, [start_timestamp])
        }

        if (typeof(end_timestamp) === 'number') {
          //query.where('EXTRACT(EPOCH FROM created_at)', '<=', end_timestamp)
          query.whereRaw(`(EXTRACT(EPOCH FROM created_at) * 1000 ${offset}) <= ?`, [end_timestamp])
        }

        let result = await query.fetch()
        return result.toJSON()
      })
      return output
    }
    
    Model.prototype.getRated = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getRated`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let rates
        
        let annotationRates = {}
        let commentRates = {}
        
        rates = await this.getAnnotationRatedInStep(webpage, start_timestamp, end_timestamp)
        //console.log(rates.length)
        rates.forEach((rate) => {
          //console.log(JSON.stringify(comment, null, 2))
          let type = rate.type
          let user = rate.rater
          
          if (!annotationRates[type]) {
            annotationRates[type] = {}
          }
          
          //console.log(type, user.id)
          
          if (!annotationRates[type][user.id]) {
            annotationRates[type][user.id] = {
              avatar_url: user.avatar_url,
              name: user.display_name,
              count: 0
            }
          }
          annotationRates[type][user.id].count++
        })
        //console.log(JSON.stringify(annotationRates, null, 2))
        
        // --------------------------------------------------------------
        
        rates = await this.getAnnotationCommentRatedInStep(webpage, start_timestamp, end_timestamp)
        rates.forEach((rate) => {
          //console.log(JSON.stringify(comment, null, 2))
          let type = rate.type
          let user = rate.user
          
          if (!commentRates[type]) {
            commentRates[type] = {}
          }
          
          if (!commentRates[type][user.id]) {
            commentRates[type][user.id] = {
              avatar_url: user.avatar_url,
              name: user.display_name,
              count: 0
            }
          }
          commentRates[type][user.id].count++
        })
        // --------------------------------------------------------------
        
        return {
          annotation: annotationRates,
          comment: commentRates
        }
      })
      return output
    }
    
  } // register (Model) {
}

module.exports = UserDashboard
