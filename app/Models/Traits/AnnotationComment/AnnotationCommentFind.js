'use strict'

const AnnotationCommentModel = use('App/Models/AnnotationComment')

const Cache = use('Cache')
const Config = use('Config')

class AnnotationCommentSave {

  register(Model) {
    
    Model.findWithPage = async function (webpage, user, options = {}) {
      let {
        annotationID,
        //page,
        //afterTime,
      } = options
      
      if (typeof(annotationID) !== 'number') {
        throw new Error('Annotation ID is required.')
      }
      
      // ----------------------------------
      
      let cacheKey = Cache.keys('AnnotationComment', annotationID)
      throw new Error('快取的地方還沒做完')
      
      // ----------------------------------
      
      let query = AnnotationCommentModel
              .query()
              .where('annotation_id', annotationID)
              .where('deleted', false)
              .withCount('likes')
              .orderBy('created_at', 'desc')
      
      // -----------------------------------
      
      _processPage(query, options)
      
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
    }
    
  } // register (Model) {
}

module.exports = AnnotationCommentSave
