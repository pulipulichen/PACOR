'use strict'

const Cache = use('Cache')
const Config = use('Config')

const AnnotationModel = use('App/Models/Annotation')
const TypeHelper = use('App/Helpers/TypeHelper')
const { HttpException } = use('@adonisjs/generic-exceptions') 

class AnnotationFind {

  register(Model) {
    
    let userQueryBuilder = (builder) => {
      builder.setHidden(['preference', 'email', 'password', 'role', 'domain_id', 'updated_at', 'created_at'])
    }
    
    Model.findByWebpageGroupPosition = async function (webpage, user, options) {
      options = options ? options : {}
      
      let { afterTime
        , anchorPositions
        , anchorMode
        , withCount
        , pick
        //, findUserID
        //, findType
        , page
        , keyword
        , onlySectionAnnotation
        , seq_id
        , orderBy
        , excludeIDList
        , focusUserID
      } = options
      const doQuery = async evt => {
        //console.log('findByWebpageGroupPosition', anchorPositions)

        let query = this.query()
                .where('webpage_id', webpage.primaryKeyValue)
                .with('user', userQueryBuilder)
                .with('notes')
                .where('deleted', false)
                .whereRaw('((user_id = ? ) or (user_id != ? and public = ?))', [user.primaryKeyValue, user.primaryKeyValue, true])
                //.whereRaw('user_id = ?', [user.primaryKeyValue])
                .with('anchorPositions')

        let types = await user.getCurrentReadingProgressStepAnnotationTypes(webpage)
        //console.log(types)
        query.whereIn('type', types)

        if (withCount === true) {
          query.withCount('likes')
          query.withCount('comments')
          
          query.withCount('i_have_liked', (queryBuilder) => {
            queryBuilder.where('user_id', user.primaryKeyValue)
          })
          query.withCount('i_have_commented', (queryBuilder) => {
            queryBuilder.where('user_id', user.primaryKeyValue)
          })
        }

        _queryFindType(query, options)
        
        // -------------------------
        
        focusUserID = TypeHelper.parseInt(focusUserID)
        if (typeof(focusUserID) === 'number') {
          query.whereIn('user_id', [focusUserID, user.primaryKeyValue])
          
          let dir = 'asc'
          if (focusUserID > user.primaryKeyValue) {
            dir = 'desc'
          }
          query.orderBy('user_id', dir)
        }
        else {
          let userList = await user.getUserIDsInGroup(webpage, true)
          query.whereIn('user_id', userList)
        }

        // -------------------------

        if (typeof(page) === 'string' 
                && isNaN(page) === false) {
          page = parseInt(page, 10)
        }
        if (typeof (page) === 'number') {
          let itemsPerPage = Config.get('view.itemsPerPage')
          query.limit(itemsPerPage)
          query.offset(itemsPerPage * page)
        }
        
        // -------------------------

        if (anchorPositions !== undefined) {
          if (Array.isArray(anchorPositions) === false) {
            anchorPositions = [anchorPositions]
          }
          if (Array.isArray(anchorPositions)) {
            query.whereHas('anchorPositions', (builder) => {
              builder.where('webpage_id', webpage.primaryKeyValue)
                      .where('type', 'textContent')
              this._buildAnchorPositionWhere(builder, anchorMode, anchorPositions)
            })
          }
        }
        else if (onlySectionAnnotation === true) {
          query.whereHas('anchorPositions', (builder) => {
            builder.where('webpage_id', webpage.primaryKeyValue)
                    .where('type', 'section')
            
            if (typeof(seq_id) === 'number') {
              builder.where('seq_id', seq_id)
            }
          })
        }
        
        // -------------------------
        
        if (typeof(seq_id) === 'string' 
                && isNaN(seq_id) === false) {
          seq_id = parseInt(seq_id, 10)
        }
        if (typeof(seq_id) === 'number') {
          query.whereHas('anchorPositions', (builder) => {
            builder.where('seq_id', seq_id)
          })
        }
        
        // --------------------------
        
        if (typeof (keyword) === 'string') {
          query.whereHas('notes', (builder) => {
            keyword = keyword.toLowerCase()
            builder.whereRaw('lower(note) like ?', `%${keyword}%`)
          })
        }

        //console.log(afterTime, typeof(afterTime))
        if (typeof (afterTime) === 'string') {
          afterTime = parseInt(afterTime, 10)
        }
        if (typeof (afterTime) === 'number') {
          //console.log(afterTime)
          // 這邊應該還要做些調整
          query.where('updated_at_unixms', '>', afterTime)
        }
        
        // ---------------------------------------------------
        
        if (!orderBy) {
          query.orderBy('updated_at_unixms', 'desc')
        }
        else {
          Object.keys(orderBy).forEach(field => {
            query.orderBy(field, orderBy[field])
          })
        }
        
        // ---------------------------------------------------
        
        if (Array.isArray(excludeIDList)) {
          query.whereNotIn('id', excludeIDList)
        }
        
        // ---------------------------------------------------

        //if (anchorMode === 'exact') console.log(query.toSQL())
        //console.log(query.toSQL())
        let result
        //console.log(pick)
        if (typeof (pick) !== 'number') {
          result = await query.fetch()
        } else {
          result = await query.pick(pick)
          if (pick === 1) {
            result = result.first()
          }
        }
        //console.log(result)

        return result
      }

      if (afterTime !== undefined || true) {
        return await doQuery()
      } else {
        let cacheKey = Cache.key(`Annotation.findByWebpageGroupPosition`, webpage, user, options)

        //console.log(cacheKey)
        return await Cache.rememberWait([webpage, user, this], cacheKey, 0.5, async () => {
          let result = await doQuery()
          //await Cache.put(cacheKey, result, 2)
          return result
        })  // return await Cache.get(cacheKey, async () => {
      }
    } // Model.findByWebpageGroupPosition = async function (webpage, user, options) {
    
    Model.findByWebpageUser = async function (webpage, user, options) {
      return await this.findByWebpageGroupPosition(webpage, user, options)
    }
    
    // ---------------------------
    
    Model.findOthersByWebpageGroup = async function (webpage, user, options) {
      let {
        afterTime,
        focusUserID,
        findType
      } = options
      
      const doQuery = async evt => {

        //console.log(userList)
        //throw new Error(userList)
        
        let query = this.query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('deleted', false)
                .whereRaw('(user_id != ? and public = ?)', [user.primaryKeyValue, true])
                //.whereRaw('user_id = ?', [user.primaryKeyValue])
                .with('anchorPositions')
                .orderBy('updated_at_unixms', 'desc')

        let types = await user.getCurrentReadingProgressStepAnnotationTypes(webpage)
        query.whereIn('type', types)

        //console.log(afterTime, typeof(afterTime))
        if (typeof (afterTime) === 'string') {
          afterTime = parseInt(afterTime, 10)
        }
        if (typeof (afterTime) === 'number') {
          //console.log(afterTime)
          // 這邊應該還要做些調整
          query.where('updated_at_unixms', '>', afterTime)
        }
        
        _queryFindType(query, options)
        
        // ----------------------------------
        
        focusUserID = TypeHelper.parseInt(focusUserID)
        if (typeof(focusUserID) === 'number') {
          query.where('user_id', focusUserID)
        }
        else {
          let userList = await user.getOtherUserIDsInGroup(webpage)
          query.whereIn('user_id', userList)
        }
        
        // ---------------------------------
        // 
        //console.log('findOthersByWebpageGroup', options)

        //console.log(query.toSQL())
        
        let result = await query.fetch()
        return result
      }
      
      // ---------------------------

      if (afterTime !== undefined) {
        return await doQuery()
      } 
      else {
        let cacheKey = Cache.key(`Annotation.findOthersByWebpageGroup`, webpage, user, focusUserID, findType)
        return await Cache.rememberWait([webpage, user, this], cacheKey, 2, async () => {
          let result = await doQuery()
          //await Cache.put(cacheKey, result, 2)
          return result
        })  // return await Cache.get(cacheKey, async () => {
      }
    } // static async findOthersByWebpageGroup(webpage, user, afterTime) {
    
    let _queryFindType = function (query, options) {
      let {
        findType
      } = options
      
      if (typeof(findType) === 'string') {
        query.where('type', findType)
      }
    }
    
    Model.findByWebpageGroup = async function (webpage, user, query) {
      let myAnnotations = await this.findMyByWebpageGroup(webpage, user, query)
      let othersAnnotations = await this.findOthersByWebpageGroup(webpage, user, query)

      return myAnnotations.toJSON().concat(othersAnnotations.toJSON())
    }

    Model.findMyByWebpageGroup = async function (webpage, user, options) {
      let {
        afterTime,
        findType
      } = options
      
      const doQuery = async evt => {

        let query = this.query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', user.primaryKeyValue)
                .where('deleted', false)
                .with('anchorPositions')
                .orderBy('updated_at_unixms', 'desc')

        if (findType) {
          query.where('type', findType)
        }
        else {
          let types = await user.getCurrentReadingProgressStepAnnotationTypes(webpage)
          //console.log(types)
          query.whereIn('type', types)
        }

        //console.log(afterTime, typeof(afterTime))
        if (typeof (afterTime) === 'string') {
          afterTime = parseInt(afterTime, 10)
        }
        if (typeof (afterTime) === 'number') {
          //console.log(afterTime)
          // 這邊應該還要做些調整
          query.where('updated_at_unixms', '>', afterTime)
        }

        //console.log(query.toSQL())
        let result = await query.fetch()
        return result
      }

      return await doQuery()
    } // static async findOthersByWebpageGroup(webpage, user, afterTime) {

    Model.getAnnotation = async function (webpage, user, options) {
      let {
        annotationID
      } = options
      
      if (!annotationID) {
        throw new Error('Annotation ID is required.')
      }
      
      let annotation = await AnnotationModel
              .query()
              .where('id', TypeHelper.parseInt(annotationID))
              .where('deleted', false)
              .with('user', userQueryBuilder)
              .with('notes')
              .with('anchorPositions')
              .fetch()
      
      if (annotation === null) {
        throw new Error('Annotation is not existed.')
      }
      
      annotation = annotation.first()
      
      if (annotation.webpage_id !== webpage.primaryKeyValue) {
        throw new HttpException('Forbidden', 403)
      }
      
      return annotation
    }
  } // register (Model) {
}

module.exports = AnnotationFind
