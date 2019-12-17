'use strict'

const Cache = use('Cache')
const Config = use('Config')

const AnnotationModel = use('App/Models/Annotation')
const TypeHelper = use('App/Helpers/TypeHelper')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const Profiler = use('Profiler')
const DatabaseHelper = use('App/Helpers/DatabaseHelper')

class AnnotationFind {

  register(Model) {
    
    let userQueryBuilder = (builder) => {
      builder.setHidden(['preference', 'email', 'password', 'role', 'domain_id', 'updated_at', 'created_at'])
    }
    
    Model.findByWebpageGroupPosition = async function (webpage, user, options = {}) {
      
      //console.log(options)
      if (options.page === null) {
        throw new HttpException('options.page is null')
      }
      
      let profiler = new Profiler(3, 'Annotation.AnnotationFind.findByWebpageGroupPosition()')
      
      //options = options ? options : {}
      
      let { afterTime
        , anchorPositions
        , anchorMode
        , withCount
        , pick
        , findUserID
        //, findType
        , page
        , keyword
        , onlySectionAnnotation
        , seq_id
        , section_id
        , orderBy
        , excludeIDList
        , focusUserID
      } = options
      
      profiler.mark('parsing options', options)
      
      const doQuery = async () => {
        
        profiler.mark('doQuery')
        
        pick = TypeHelper.parseInt(pick)
      
        //console.log('findByWebpageGroupPosition', anchorPositions)

        let query = this.query()
                .where('webpage_id', webpage.primaryKeyValue)
                .with('user', userQueryBuilder)
                .with('notes')
                .where('deleted', false)
                .whereRaw('((user_id = ? ) or (user_id != ? and public = ?))', [user.primaryKeyValue, user.primaryKeyValue, true])
                //.whereRaw('user_id = ?', [user.primaryKeyValue])
                .with('anchorPositions')
        
        profiler.mark('query')

        if (!onlySectionAnnotation) {
          if (!options.findType) {
            //let types = await user.getStepHighlightAnnotationTypes(webpage)
            let types = await user.getStepAnnotationTypes(webpage)
            //console.log(types)
            if (types.length > 0) {
              query.whereIn('type', types)
            }
            else {
              profiler.finish()
              if (pick === 1) {
                return null
              }
              else {
                return []
              }
            }
            profiler.after('types', types)
          }
          else {
            this._queryFindType(query, options)
            profiler.mark('_queryFindType')
          }
        }
        

        // -----------------------------

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
        profiler.mark('withCount', withCount)

        
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
        else if (typeof(TypeHelper.parseInt(findUserID)) === 'number') {
          //console.log(findUserID)
          query.where('user_id', findUserID)
        }
        else if (user.isAdmin()) {
          //console.log('不做任何限制')
          // 不做任何限制
        }
        else {
          
          profiler.before('await user.isInAnonymousGroup(webpage)')
          let isInAnonymousGroup = await user.isInAnonymousGroup(webpage)
          
          if (isInAnonymousGroup === false) {
            profiler.before('await user.getUserIDsInGroup(webpage, true)')
            let userIdList = await user.getUserIDsInGroup(webpage, true)

            if (userIdList.length > 0) {
              if (typeof(userIdList[0]) !== 'number') {
                throw new Error('userList should be id list')
              }
              query.whereIn('user_id', userIdList)
            }
          }
          else {
            profiler.before('await webpage.getUserIDsInGroups()')
            let userIdList = await webpage.getUserIDsInGroups()
            if (userIdList !== null) {
              query.whereNotIn('user_id', userIdList)
            }
          }
          
          profiler.after('await user.getUserIDsInGroup(webpage, true)')
        }
        profiler.mark('focusUserID', focusUserID)

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
        profiler.mark('page', page)
        
        // -------------------------

        if (anchorPositions !== undefined) {
          if (Array.isArray(anchorPositions) === false) {
            anchorPositions = [anchorPositions]
          }
          if (Array.isArray(anchorPositions) 
                  && anchorPositions.length > 0) {
            query.whereHas('anchorPositions', (builder) => {
              builder.where('webpage_id', webpage.primaryKeyValue)
                      .where('type', 'textContent') // 這個限制會讓人看不到SectionMainIdea，先拿掉了
              this._buildAnchorPositionWhere(builder, anchorMode, anchorPositions)
            })
          }
          profiler.mark('anchorPositions', anchorPositions)
        }
        else if (onlySectionAnnotation === true) {
          let types = await user.getStepSectionAnnotationTypes(webpage)
          //console.log(types)
          query.whereIn('type', types)
                .whereHas('anchorPositions', (builder) => {
                  builder.where('webpage_id', webpage.primaryKeyValue)
                         .where('type', 'section')

                  if (typeof(seq_id) === 'number') {
                    builder.where('seq_id', seq_id)
                  }
                })
          profiler.mark('onlySectionAnnotation', seq_id, types)
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
        profiler.mark('seq_id', seq_id)
        
        // ------------------------
        
        section_id = TypeHelper.parseInt(section_id)
        if (typeof(section_id) === 'number') {
          query.whereHas('anchorPositions', (builder) => {
            builder.where('section_id', section_id)
          })
        }
        profiler.mark('section_id', section_id)
        
        // --------------------------
        
        if (typeof (keyword) === 'string') {
          query.whereHas('notes', (builder) => {
            keyword = keyword.toLowerCase()
            builder.whereRaw('lower(note) like ?', `%${keyword}%`)
          })
          profiler.mark('keyword', keyword)
        }

        //console.log(afterTime, typeof(afterTime))
        if (typeof (afterTime) === 'string') {
          afterTime = parseInt(afterTime, 10)
        }
        if (typeof (afterTime) === 'number') {
          //console.log(afterTime)
          // 這邊應該還要做些調整
          query.where('updated_at_unixms', '>', afterTime)
          profiler.mark('afterTime', afterTime)
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
        profiler.mark('orderBy', orderBy)
        
        // ---------------------------------------------------
        
        if (Array.isArray(excludeIDList)) {
          query.whereNotIn('id', excludeIDList)
          profiler.mark('excludeIDList', excludeIDList)
        }
        
        // ---------------------------------------------------

        //if (anchorMode === 'exact') console.log(query.toSQL())
        
        //console.log(DatabaseHelper.toSQL(query))
        
        profiler.mark('before fetch')
        
        let result
        //console.log(pick)
        try {
          if (typeof (pick) !== 'number') {
            result = await query.fetch()
          } else {
            result = await query.pick(pick)
            if (pick === 1) {
              result = result.first()
            }
          }
        }
        catch (e) {
          console.error('[ANNOTATION FIND ERROR]')
          console.log(JSON.stringify(options, null, 2))
          //console.log(query.toSQL().toNative())
          console.log(DatabaseHelper.toSQL(query))
          throw e
        }
        //console.log(result)
        profiler.finish()
        return result
      }
      
      // ---------------------------
      
      // 如果不使用快取的話呢？
      return await doQuery()
      
      // -------------------

      if (afterTime !== undefined || true) {
        return await doQuery()
      } else {
        let cacheKey = Cache.key(`Annotation.findByWebpageGroupPosition`, webpage, user, options)

        //console.log(cacheKey)
        return await Cache.rememberWait([webpage, user], cacheKey, 0.5, async () => {
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
        findType,
        limit,
        exceptTypes
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

        let types = await user.getStepHighlightAnnotationTypes(webpage)
        if (types.length > 0) {
          query.whereIn('type', types)
        }
        else {
          return []
        }
        
        if (Array.isArray(exceptTypes)) {
          query.whereNotIn('type', exceptTypes)
        }
        
        limit = TypeHelper.parseInt(limit)
        if (limit !== undefined) {
          query.limit(limit)
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
        
        this._queryFindType(query, options)
        
        // ----------------------------------
        
        focusUserID = TypeHelper.parseInt(focusUserID)
        if (typeof(focusUserID) === 'number') {
          query.where('user_id', focusUserID)
        }
        else if (user.isAdmin()) {
          query.whereNot('user_id', user.primaryKeyValue)
        }
        else {
          //console.log('before user.getOtherUserIDsInGroup')
          let isInAnonymousGroup = await user.isInAnonymousGroup(webpage)
          
          if (isInAnonymousGroup === false) {
            let userList = await user.getOtherUserIDsInGroup(webpage)
            query.whereIn('user_id', userList)
          }
          else {
            // 因為自己也不被分配為小組內，所以不需要考慮自己
            let userIdList = await webpage.getUserIDsInGroups()
            if (userIdList !== null) {
              query.whereNotIn('user_id', userIdList)
            }
          }
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
        return await Cache.rememberWait([webpage, user], cacheKey, 2, async () => {
          let result = await doQuery()
          //await Cache.put(cacheKey, result, 2)
          return result
        })  // return await Cache.get(cacheKey, async () => {
      }
    } // static async findOthersByWebpageGroup(webpage, user, afterTime) {
    
    Model._queryFindType = function (query, options) {
      let {
        findType
      } = options
      
      if (typeof(findType) === 'string') {
        query.where('type', findType)
      }
    }
    
    Model.findByWebpageGroup = async function (webpage, user, query) {
      let myAnnotations = await this.findMyByWebpageGroup(webpage, user, query)
      if (typeof(myAnnotations.toJSON) === 'function') {
        myAnnotations = myAnnotations.toJSON()
      }
      
      let othersAnnotations = await this.findOthersByWebpageGroup(webpage, user, query)
      if (typeof(othersAnnotations.toJSON) === 'function') {
        othersAnnotations = othersAnnotations.toJSON()
        myAnnotations.concat(othersAnnotations)
      }
      
      return myAnnotations
    }

    Model.findMyByWebpageGroup = async function (webpage, user, options) {
      let {
        afterTime,
        findType,
        exceptTypes,
        limit
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
          let types = await user.getStepHighlightAnnotationTypes(webpage)
          //console.log(types)
          if (types.length > 0) {
            query.whereIn('type', types)
          }
          else {
            return []
          }
        }
        
        if (Array.isArray(exceptTypes)) {
          query.whereNotIn('type', exceptTypes)
        }
        
        limit = TypeHelper.parseInt(limit)
        if (limit !== undefined) {
          query.limit(limit)
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
