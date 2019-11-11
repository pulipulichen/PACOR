'use strict'

//const HttpException = use('HttpException')
const {HttpException} = use('@adonisjs/generic-exceptions') 
const AnnotationModel = use('App/Models/Annotation')

const Cache = use('Cache')
const Config = use('Config')

class AnnotationSection {

  register(Model) {
    
    Model.buildSectionsAnnotationSummary = async function (webpage, user, query) {
      //throw new HttpException('@TODO')
      //return []
      let cacheKey = Cache.key(`Annotation.buildSectionsAnnotationSummary`, query)

      //console.log(cacheKey)
      
      let cacheMinute = 2
      //cacheMinute = 0.001 // for test
            
      return await Cache.rememberWait(Cache.buildTags(webpage, user, this), cacheKey, cacheMinute, async () => {
        let itemsPerPage = Config.get('view.itemsPerPage')
        
        let annotations = await this.findByWebpageGroupPosition(webpage, user, {
          onlySectionAnnotation: true
        })

        annotations = annotations.toJSON()
        
        //console.log(annotations.size())
        let sectionAnnotations = {}
        let maxSectionID = -1
        
        let sectionUsers = {}
        let sectionUsersID = {}
        
        let sectionUserCount = {}
        let sectionUserCountID = {}
        
        annotations.forEach(annotation => {
          //console.log(annotation.id, annotation.anchorPositions[0])
          
          let sectionSeqID = annotation.anchorPositions[0].seq_id
          if (sectionSeqID > maxSectionID) {
            maxSectionID = sectionSeqID
          }
          
          if (Array.isArray(sectionAnnotations[sectionSeqID]) === false) {
            sectionAnnotations[sectionSeqID] = []
          }
          if (sectionAnnotations[sectionSeqID].length <= itemsPerPage) {
            sectionAnnotations[sectionSeqID].push(annotation)
          }
          //console.log(sectionAnnotations[sectionSeqID].length)
          
          if (Array.isArray(sectionUsers[sectionSeqID]) === false) {
            sectionUsers[sectionSeqID] = []
            sectionUsersID[sectionSeqID] = []
          }
          if (sectionUsers[sectionSeqID].length <= 3) {
            if (sectionUsersID[sectionSeqID].indexOf(annotation.user_id) === -1) {
              sectionUsersID[sectionSeqID].push(annotation.user_id)
              sectionUsers[sectionSeqID].push(annotation.user)
            }
          }
          
          if (Array.isArray(sectionUserCount[sectionSeqID]) === false) {
            sectionUserCount[sectionSeqID] = 0
            sectionUserCountID[sectionSeqID] = []
          }
          if (sectionUserCountID[sectionSeqID].indexOf(annotation.user_id) === -1) {
            sectionUserCountID[sectionSeqID].push(annotation.user_id)
            sectionUserCount[sectionSeqID]++
          }
          
        })
        
        //console.log(sectionAnnotations)
        
        //console.log(sectionUsers)
        /*
        let output = new Array((maxSectionID + 1))
        return output.map((item, seqID) => {
          seqID = seqID + ''
          console.log(seqID)
          console.log(sectionAnnotations[seqID])
          
          return {
            annotations: sectionAnnotations[seqID],
            users: sectionUsers[seqID],
            userCount: sectionUserCount[seqID]
          }
        })
        */
        let output = []
        for (let i = 0; i < maxSectionID + 1; i++) {
          let seqID = i + ''
          output.push({
            annotations: sectionAnnotations[seqID],
            users: sectionUsers[seqID],
            userCount: sectionUserCount[seqID]
          })
        }
        
        
        return output
      })
    }
    
    Model.getSectionAnnotations = async function (webpage, user, query) {
      let cacheKey = Cache.key(`Annotation.getSectionAnnotations`, query)
      return await Cache.rememberWait(Cache.buildTags(webpage, user, this), cacheKey, 2, async () => {
        //let itemsPerPage = Config.get('view.itemsPerPage')
        //console.log(query)
        return await this.findByWebpageGroupPosition(webpage, user, {
          onlySectionAnnotation: true,
          seq_id: query.seq_id,
          page: query.page
        })
      })
    }
  } // register (Model) {
}

module.exports = AnnotationSection