'use strict'

const Cache = use('Cache')
const Config = use('Config')

const AnnotationModel = use('App/Models/Annotation')
const TypeHelper = use('App/Helpers/TypeHelper')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const Profiler = use('Profiler')

class AnnotationFind {

  register(Model) {
    
    Model.findOthersByWebpageGroup = async function (webpage, user, options) {
      let {
        afterTime,
        focusUserID,
        findType,
        limit,
        exceptTypes,
        exceptArea
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
        
        this._quertExceptArea(query, exceptArea)
        
        // ----------------------------------
        
        focusUserID = TypeHelper.parseInt(focusUserID)
        if (typeof(focusUserID) === 'number') {
          query.where('user_id', focusUserID)
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
    
    Model._quertExceptArea = function (query, area) {
      if (!area || !area.keepSearch) {
        return false
      }
      
      query.limit(50)
      
      query.whereHas('anchorPositions', builder => {
        builder.where('seq_id', '>', area.article.maxSeqID)
        
        if (area.article.minSeqID > 0) {
          builder.orWhere('seq_id', '<', area.article.minSeqID)
        }
        
        builder.orWhereNotIn('seq_id', area.article.seqIDList)
        
        // -----------------------------
        
        for (let seq_id in area.paragraphs) {
          let paragraph = area.paragraphs[seq_id]
          seq_id = parseInt(seq_id, 10)
          
          builder.orWhere(function () {
            this.where('seq_id', seq_id)
                    .where(function () {
              
              Model._quertExceptAreaParagraph(this, paragraph)
              
            })
          })
          
        } // for (let seq_id in area.paragraphs) {
      })
    } // Model._quertExceptArea = function (query, area) {
    
    Model._quertExceptAreaParagraph = function (builder, paragraph) {
      builder.where('end_pos', '>', paragraph.maxPos)

      if (paragraph.minPos > 0) {
        builder.orWhere('start_pos', '<', paragraph.minPos)
      }
      
      paragraph.gaps.forEach(gap => {
        builder.orWhereBetween('start_pos', gap)
                .orWhereBetween('end_pos', gap)
                .orWhere(function () {
          // 涵蓋gap
          this.where('start_pos', '<', gap[0])
              .where('end_pos', '>', gap[1])
        })
      })
    } // Model._quertExceptAreaParagraph = function (builder, paragraph) {
    
  } // register (Model) {
}

module.exports = AnnotationFind
