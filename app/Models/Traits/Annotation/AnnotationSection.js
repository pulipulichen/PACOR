'use strict'

//const HttpException = use('HttpException')
const {HttpException} = use('@adonisjs/generic-exceptions') 
const AnnotationModel = use('App/Models/Annotation')

const Cache = use('Cache')
const Config = use('Config')

class AnnotationSection {

  register(Model) {
    Model.getSectionsAnnotation = async function (webpage, user, query) {
      //throw new HttpException('@TODO')
      //return []
      let cacheKey = Cache.key(`Annotation.getSectionsAnnotation`, query)

      //console.log(cacheKey)
      
      let cacheMinute = 2
      cacheMinute = 0 // for test
            
      return await Cache.rememberWait(Cache.buildTags(webpage, user, this), cacheKey, cacheMinute, async () => {
        let itemsPerPage = Config.get('view.itemsPerPage')
        
        let annotations = await this.findByWebpageGroupPosition(webpage, user, {
          onlySectionAnnotation: true
        })

        annotations = annotations.toJSON()
        //console.log(annotations.size())
        let sectionMap = {}
        let maxSectionID = -1
        annotations.forEach(annotation => {
          let sectionSeqID = annotation.anchorPositions[0].seq_id
          if (sectionSeqID > maxSectionID) {
            maxSectionID = sectionSeqID
          }
          if (Array.isArray(sectionMap[sectionSeqID]) === false) {
            sectionMap[sectionSeqID] = []
          }
          else if (sectionMap[sectionSeqID].length > itemsPerPage) {
            return false
          }
          
          sectionMap[sectionSeqID].push(annotation)
        })
        
        
        let output = new Array((maxSectionID + 1))
        Object.keys(sectionMap).forEach(seqID => {
          output[seqID] = sectionMap[seqID]
        })
        
        return output
      })
    }
  } // register (Model) {
}

module.exports = AnnotationSection
