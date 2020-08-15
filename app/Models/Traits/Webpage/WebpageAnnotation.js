'use strict'

const Cache = use('Cache')
const AnnotationModel = use('App/Models/Annotation')
const AnchorPositionModel = use('App/Models/AnchorPosition')

class WebpageAnnotation {

  register(Model) {
    
    /**
     * @deprecated 不使用 20191216
     */
    //Model.prototype.getAnnotationTypes = async function () {
    Model.prototype.getHighlightAnnotationTypes = async function () {
      let cacheKey = Cache.key('getAnnotationTypes')
      
      let tags = [this]
      
      return await Cache.rememberWait(tags, cacheKey, 1, async () => {
        let query = this.hasMany('App/Models/Annotation')
                      .groupBy('type')
                      .select(['type'])
        
        // 排除小結重點
        query.whereNot('type', 'SectionMainIdea')
        
        query.groupBy('webpage_id')
             .where('webpage_id', this.primaryKeyValue)
              
        return query.count('id as count')
      })
    } // Model.prototype.getHighlightAnnotationTypes = async function () {
    
    Model.prototype.getMaxSeqID = async function () {
      let cacheKey = Cache.key('getMaxSeqID')
      return await Cache.rememberWait([this, 'Webpage'], cacheKey, async () => {
        let result = await AnchorPositionModel
                .query()
                .where('webpage_id', this.primaryKeyValue)
                .where('type', 'textContent')
                .orderBy('seq_id', 'desc')
                .limit(1)
                .first()
        
        let seq_id = result.seq_id
        //console.log(seq_id, typeof(seq_id))
        return seq_id
      })
    }
    
    Model.prototype.getSeqCodes = async function () {
      let cacheKey = Cache.key('getSeqCodes')
      return await Cache.rememberWait([this, 'Webpage'], cacheKey, async () => {
        let seq_id = await this.getMaxSeqID()
        
        let codes = []
        for (let i = 0; i <= seq_id; i++) {
          codes.push(i)
        }
        return codes
      })
    }
    
  } // register (Model) {
}

module.exports = WebpageAnnotation
