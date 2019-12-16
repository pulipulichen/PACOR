'use strict'

const Cache = use('Cache')
const AnnotationModel = use('App/Models/Annotation')

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
    
  } // register (Model) {
}

module.exports = WebpageAnnotation
