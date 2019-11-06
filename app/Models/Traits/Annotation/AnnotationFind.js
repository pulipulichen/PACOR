'use strict'

const Cache = use('Cache')
const config = use('Config')

class AnnotationFind {

  register(Model) {
    Model.findOthersByWebpageGroup = async function (webpage, user, {afterTime}) {
      const doQuery = async evt => {

        let userList = await user.getOtherUserIDsInGroup(webpage)
        let query = this.query()
                .where('webpage_id', webpage.primaryKeyValue)
                .whereIn('user_id', userList)
                .where('deleted', false)
                .whereRaw('(user_id != ? and public IS ?)', [user.primaryKeyValue, true])
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

        //console.log(query.toSQL())
        let result = await query.fetch()
        return result
      }

      if (afterTime !== undefined) {
        return await doQuery()
      } 
      else {
        let cacheKey = Cache.key(`Annotation.findOthersByWebpageGroup`, webpage, user)
        return await Cache.rememberWait(Cache.buildTags(webpage, user, this), cacheKey, 2, async () => {
          let result = await doQuery()
          //await Cache.put(cacheKey, result, 2)
          return result
        })  // return await Cache.get(cacheKey, async () => {
      }
    } // static async findOthersByWebpageGroup(webpage, user, afterTime) {

    Model.findByWebpageGroup = async function (webpage, user, query) {
      let myAnnotations = await this.findMyByWebpageGroup(webpage, user, query)
      let othersAnnotations = await this.findOthersByWebpageGroup(webpage, user, query)

      return myAnnotations.toJSON().concat(othersAnnotations.toJSON())
    }

    Model.findMyByWebpageGroup = async function (webpage, user, {afterTime}) {
      const doQuery = async evt => {

        let query = this.query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', user.primaryKeyValue)
                .where('deleted', false)
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

        //console.log(query.toSQL())
        let result = await query.fetch()
        return result
      }

      return await doQuery()
    } // static async findOthersByWebpageGroup(webpage, user, afterTime) {

    Model.findByWebpageGroupPosition = async function (webpage, user, {afterTime, anchorPositions, anchorMode, withCount, pick, findUserID, findType, page}) {
      const doQuery = async evt => {
        //console.log('findByWebpageGroupPosition', anchorPositions)

        let userList = await user.getUserIDsInGroup(webpage)

        let query = this.query()
                .where('webpage_id', webpage.primaryKeyValue)
                .whereIn('user_id', userList)
                .with('user')
                .with('notes')
                .where('deleted', false)
                .whereRaw('((user_id = ? ) or (user_id != ? and public = ?))', [user.primaryKeyValue, user.primaryKeyValue, true])
                //.whereRaw('user_id = ?', [user.primaryKeyValue])
                .with('anchorPositions')
                .orderBy('updated_at_unixms', 'desc')

        if (withCount === true) {
          query.withCount('rates')
          query.withCount('replies')
        }

        if (typeof (findUserID) === 'number') {
          query.where('user_id', findUserID)
        }

        if (typeof (findType) === 'string') {
          query.where('type', findType)
        }

        if (typeof (page) === 'number') {
          let itemsPerPage = config.get('view.itemsPerPage')
          query.limit(itemsPerPage)
          query.offset(itemsPerPage * page)
        }

        if (anchorPositions !== undefined) {
          if (Array.isArray(anchorPositions) === false) {
            anchorPositions = [anchorPositions]
          }
          if (Array.isArray(anchorPositions)) {
            query.whereHas('anchorPositions', (builder) => {
              builder.where('webpage_id', webpage.primaryKeyValue)
              this._buildAnchorPositionWhere(builder, anchorMode, anchorPositions)
            })
          }
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
        let cacheKey = Cache.key(`Annotation.findByWebpageGroupPosition`, webpage, user, anchorPositions, withCount, pick)

        //console.log(cacheKey)
        return await Cache.rememberWait(Cache.buildTags(webpage, user, this), cacheKey, 2, async () => {
          let result = await doQuery()
          //await Cache.put(cacheKey, result, 2)
          return result
        })  // return await Cache.get(cacheKey, async () => {
      }
    } // static async findOthersByWebpageGroup(webpage, user, afterTime) {

  } // register (Model) {
}

module.exports = AnnotationFind
