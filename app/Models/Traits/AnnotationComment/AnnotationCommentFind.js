'use strict'

const AnnotationCommentModel = use('App/Models/AnnotationComment')

const Cache = use('Cache')
const Config = use('Config')

class AnnotationCommentSave {

  register(Model) {
    
    Model.findSummary = async function (webpage, user, options = {}) {
      let {
        annotationID
      } = options
      
      //console.log(options)
      
      let comments = await this.findWithPage(webpage, user, {
        annotationID,
        page: 0
      })
      
      let itemsPerPage = Config.get('view.itemsPerPage')
      let commentCount = 0
      if (comments.length === itemsPerPage) {
        commentCount = await this.countComments(webpage, user, annotationID)
        commentCount = commentCount - itemsPerPage
      }
      
      return {
        comments,
        commentCount
      }
    }
    
    Model.findWithPage = async function (webpage, user, options = {}) {
      let {
        annotationID,
        //excludeIDList
        //page,
        //afterTime,
      } = options
      
      if (typeof(annotationID) === 'string'
              && isNaN(annotationID) === false) {
        annotationID = parseInt(annotationID, 10)
      }
      if (typeof(annotationID) !== 'number') {
        throw new Error('Annotation ID is required.')
      }
      
      // ----------------------------------
      
      //let cacheKey = Cache.keys('AnnotationComment', annotationID)
      //throw new Error('快取的地方還沒做完') // 快取不做
      
      // ----------------------------------
      
      let query = AnnotationCommentModel
              .query()
              .where('annotation_id', annotationID)
              .where('deleted', false)
              .with('user', (builder) => {
                builder.setHidden(['preference', 'email', 'password', 'role', 'domain_id', 'updated_at', 'created_at'])
              })
              .withCount('likes')
              .withCount('i_have_liked', (builder) => {
                builder.where('user_id', user.primaryKeyValue)
              })
              .orderBy('created_at_unixms', 'desc')
      
      // -----------------------------------
      
      _processPage(query, options)
      _excludeList(query, options)
      
      // -----------------------------------
      
      let comments = await query.fetch()
      
      if (comments.size() === 0) {
        return []
      }
      
      comments = comments.toJSON()
      comments.reverse()
      return comments
    }
    
    let _processPage = function (query, options) {
      let {
        page,
      } = options
      
      if (typeof(page) === 'string' 
              && isNaN(page) === false) {
        page = parseInt(page, 10)
      }
      if (typeof(page) === 'number') {
        let itemsPerPage = Config.get('view.itemsPerPage')
        query.limit(itemsPerPage)
        query.offset(itemsPerPage * page)
      }
    } // Model.findWithPage = async function (webpage, user, options = {}) {
    
    let _excludeList = function (query, options) {
      let {
        excludeIDList
      } = options
      
      if (Array.isArray(excludeIDList)) {
        query.whereNotIn('id', excludeIDList)
      }
    }
    
    Model.countComments = async function (webpage, user, annotationID) {
      
      let query = AnnotationCommentModel
              .query()
              .where('annotation_id', annotationID)
              .where('deleted', false)
      
      let comments = await query.fetch()
      return comments.size()
    }
    
  } // register (Model) {
}

module.exports = AnnotationCommentSave
