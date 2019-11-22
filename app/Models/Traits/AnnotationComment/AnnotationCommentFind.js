'use strict'

const AnnotationCommentModel = use('App/Models/AnnotationComment')

const Cache = use('Cache')
const Config = use('Config')
const TypeHelper = use('App/Helpers/TypeHelper')

class AnnotationCommentSave {

  register(Model) {
    let buildBaseQuery = (annotationID, user) => {
      return AnnotationCommentModel
              .query()
              .where('annotation_id', annotationID)
              .where('deleted', false)
              .with('user', userQueryBuilder)
              .withCount('likes')
              .withCount('i_have_liked', (builder) => {
                builder.where('user_id', user.primaryKeyValue)
              })
    }
    
    Model.findSummary = async function (webpage, user, options = {}) {
      let {
        annotationID,
        commentID
      } = options
      
      //console.log(options)
      
      if (commentID) {
        return await this.findFocusComment(webpage, user, {
          annotationID,
          commentID
        })
      }
      
      //console.log(annotationID)
      let comments = await this.findWithPage(webpage, user, options)
      
      let itemsPerPage = Config.get('view.itemsPerPage')
      let olderCommentCount = 0
      if (comments.length === itemsPerPage) {
        olderCommentCount = await this.countComments(webpage, user, annotationID)
        olderCommentCount = olderCommentCount - itemsPerPage
      }
      
      return {
        comments,
        olderCommentCount
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
      
      let query = buildBaseQuery(annotationID, user)
              //.orderBy('created_at_unixms', 'desc')
      
      // -----------------------------------
      
      //_focusComment(query, options)
      //_processPage(query, options)
      //_excludeList(query, options)
      _basetimeFilter(query, options)
      
      let itemsPerPage = Config.get('view.itemsPerPage')
      query.limit(itemsPerPage)
      
      // -----------------------------------
      
      let comments = await query.fetch()
      
      if (comments.size() === 0) {
        return []
      }
      
      comments = comments.toJSON()
      comments.reverse()
      return comments
    }
    
//    let _processPage = function (query, options) {
//      let {
//        page,
//      } = options
//      
//      if (typeof(page) === 'string' 
//              && isNaN(page) === false) {
//        page = parseInt(page, 10)
//      }
//      if (typeof(page) === 'number') {
//        let itemsPerPage = Config.get('view.itemsPerPage')
//        query.limit(itemsPerPage)
//        query.offset(itemsPerPage * page)
//      }
//    } // Model.findWithPage = async function (webpage, user, options = {}) {
    
//    let _excludeList = function (query, options) {
//      let {
//        excludeIDList
//      } = options
//      
//      if (Array.isArray(excludeIDList)) {
//        query.whereNotIn('id', excludeIDList)
//      }
//    }
    
    let _basetimeFilter = function (query, options) {
      let {
        afterTime,
        beforeTime
      } = options
      
      console.log(afterTime, beforeTime)
      
      if (afterTime) {
        query.where('created_at_unixms', '>' , TypeHelper.parseInt(afterTime))
                .orderBy('created_at_unixms', 'asc')
      }
      else if (beforeTime) {
        query.where('created_at_unixms', '<' , TypeHelper.parseInt(beforeTime))
                .orderBy('created_at_unixms', 'desc')
      }
      else {
        query.orderBy('created_at_unixms', 'desc')
      } 
    }
    
//    let _focusComment = function (query, options) {
//      let {
//        focusCommentID
//      } = options
//      
//      if (focusCommentID) {
//        throw new Error(focusCommentID + ' under construction')
//      }
//    }


    let userQueryBuilder = (builder) => {
      builder.setHidden(['preference', 'email', 'password', 'role', 'domain_id', 'updated_at', 'created_at'])
    }
    
    Model.findFocusComment = async function (webpage, user, options) {
      let {
        annotationID,
        commentID
      } = options
      
      if (typeof(annotationID) === 'string'
              && isNaN(annotationID) === false) {
        annotationID = parseInt(annotationID, 10)
      }
      if (typeof(annotationID) !== 'number') {
        throw new Error('Annotation ID is required.')
      }
      
      if (typeof(commentID) === 'string'
              && isNaN(commentID) === false) {
        commentID = parseInt(commentID, 10)
      }
      if (typeof(commentID) !== 'number') {
        throw new Error('Comment ID is required.')
      }
      
      // ----------------------------------
      
      
      let focusComment = await buildBaseQuery(annotationID, user)
              .where('id', commentID)
              .fetch()
      
      // -----------------------------------
      
      if (focusComment === null) {
        return []
      }
      
      let basetime = focusComment.first().created_at_unixms
      
      let itemsPerPage = Config.get('view.itemsPerPage')
      let halfItemsLimit = parseInt((itemsPerPage / 2), 10) 
      
      // -----------------------------------
      
      let olderComment = await buildBaseQuery(annotationID, user)
              .where('created_at_unixms', '<', basetime)
              .orderBy('created_at_unixms', 'desc')
              //.limit(halfItemsLimit)
              .fetch()
      
      let olderCommentCount = olderComment.size()
      
      olderComment = olderComment.toJSON().slice(0, halfItemsLimit)
      
      // 如果前面查到的數量不夠多，則挪給後面的使用
      halfItemsLimit = (halfItemsLimit - olderComment.length)
      
      // -----------------------------------
      
      let newerComment = await buildBaseQuery(annotationID, user)
              .where('created_at_unixms', '>', basetime)
              .orderBy('created_at_unixms', 'asc')
              //.limit(halfItemsLimit)
              .fetch()
      
      let newerCommentCount = newerComment.size()
      newerComment = newerComment.toJSON().slice(0, halfItemsLimit)
      
      // -------------------------------------
      // 合併
      
      let comments = []
      
      comments = comments.concat(olderComment.reverse())
      comments = comments.concat(focusComment.toJSON())
      comments = comments.concat(newerComment)
      
      return {
        comments,
        olderCommentCount,
        newerCommentCount
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
