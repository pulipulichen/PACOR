'use strict'

//const HttpException = use('HttpException')
const {HttpException} = use('@adonisjs/generic-exceptions') 
const AnnotationModel = use('App/Models/Annotation')
const AnchorPositionModel = use('App/Models/AnchorPosition')

const Cache = use('Cache')
const Config = use('Config')

const TokenizationHelper = use('App/Helpers/TokenizationHelper')
const StringHelper = use('App/Helpers/StringHelper')
const Profiler = use('Profiler')

class AnnotationSection {

  register(Model) {
    
    Model.buildSectionsAnnotationSummary = async function (webpage, user, query = {}) {
      //throw new HttpException('@TODO')
      //return []
      
      let profiler = new Profiler(0, 'Annotation/AnnotationSection.buildSectionsAnnotationSummary()', query)
      
//      let {
//        focusUserID
//      } = query
      
      profiler.before('await user.isEnableCollaboration(webpage)')
      let isEnableCollaboration = await user.isEnableCollaboration(webpage)
//      if (isEnableCollaboration === false) {
//        profiler.finish()
//        return []
//      }
      
      let cacheKey = Cache.key(`Annotation.buildSectionsAnnotationSummary`, query)

      //console.log(cacheKey)
      
      let cacheMinute = 2
      //cacheMinute = 0.001 // for test
      profiler.mark('before Cache.rememberWait()', cacheKey)
      
      let output = await Cache.rememberWait([webpage, user, 'Annotation'], cacheKey, cacheMinute, async () => {
        let section_id = 0
        //console.log(section_id)
        let o = []
        
        let  maxSectionID = await this._getMaxSectionID(webpage)
        
        while (section_id <= maxSectionID) {
          query.section_id = section_id
          if (isEnableCollaboration === false) {
            query.findUserID = user.primaryKeyValue
          }
          let result = await this.buildSeqSectionAnnotation(webpage, user, query)
          //console.log('AAA')
          //console.log(result)
          
          section_id++
          //if (Array.isArray(result.annotations) === false) {
          //  break
          //}
          o.push(result)
          //break
        }
        return o
      })
      
      profiler.finish()
      
      return output
    }
    
    Model._getMaxSectionID = async function (webpage) {
      return AnchorPositionModel
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .getMax('section_id')
    }
    
    Model.buildSeqSectionAnnotation = async function (webpage, user, query = {}) {
      //throw new HttpException('@TODO')
      //return []
      
      let profiler = new Profiler(0, 'Annotation/AnnotationSection.buildSeqSectionAnnotation()', query)
      
      profiler.before('await user.isEnableCollaboration(webpage)')
      let isEnableCollaboration = await user.isEnableCollaboration(webpage)
//      if (isEnableCollaboration === false) {
//        profiler.finish()
//        return []
//      }
      
      let cacheKey = Cache.key(`Annotation.buildSeqSectionAnnotation`, query)

      //console.log(cacheKey)
      
      let cacheMinute = 2
      //cacheMinute = 0.001 // for test
      profiler.mark('before Cache.rememberWait()', cacheKey)
      
      let output = await Cache.rememberWait([webpage, user, 'Annotation'], cacheKey, cacheMinute, async () => {
        profiler.mark('start Cache.rememberWait()')
        
        let itemsPerPage = Config.get('view.itemsPerPage')
        
        query.onlySectionAnnotation = true
        query.withCount = true
        query.page = 0
        
        if (query.selector) {
          console.error(query)
          throw new Error('query is incorrect.')
        }
        
        profiler.after('before findByWebpageGroupPosition', query)
        //console.log({query})
        let annotations = await this.findByWebpageGroupPosition(webpage, user, query)
        //console.log({query})
        if (typeof(annotations.toJSON) === 'function') {
          annotations = annotations.toJSON()
        }
        else {
          return undefined
        }
        
        profiler.after('annotations.toJSON()')
        
        //console.log(annotations.size())
        let sectionAnnotations = {}
        let myAnnotations = {}
        let maxSectionID = -1
        
        let sectionUsers = {}
        let sectionUsersID = {}
        
        let sectionUserCount = {}
        let sectionUserCountID = {}
        
        profiler.mark('before annotations.forEach()')
        
        annotations.forEach(annotation => {
          //console.log(annotation.id, annotation.anchorPositions[0])
          
          let sectionSeqID = annotation.anchorPositions[0].section_id
          //console.log(sectionSeqID)
          if (sectionSeqID > maxSectionID) {
            maxSectionID = sectionSeqID
          }
          
          if (Array.isArray(sectionAnnotations[sectionSeqID]) === false) {
            sectionAnnotations[sectionSeqID] = []
          }
          
          if (annotation.user.id === user.id) {
            myAnnotations[sectionSeqID] = annotation
          }
          else if (sectionAnnotations[sectionSeqID].length <= itemsPerPage) {
            sectionAnnotations[sectionSeqID].push(annotation)
          }
          //console.log(sectionAnnotations[sectionSeqID].length)
          
          if (Array.isArray(sectionUsers[sectionSeqID]) === false) {
            sectionUsers[sectionSeqID] = []
            sectionUsersID[sectionSeqID] = []
          }
          
          if (sectionUsers[sectionSeqID].length < 5) {
            if (sectionUsersID[sectionSeqID].indexOf(annotation.user_id) === -1) {
              sectionUsersID[sectionSeqID].push(annotation.user_id)
              sectionUsers[sectionSeqID].push(annotation.user)
            }
          }
          
          if (Array.isArray(sectionUserCountID[sectionSeqID]) === false) {
            sectionUserCount[sectionSeqID] = 0
            sectionUserCountID[sectionSeqID] = []
          }
          //console.log(sectionSeqID, annotation.user_id, sectionUserCount[sectionSeqID], (sectionUserCountID[sectionSeqID].indexOf(annotation.user_id) === -1))
          if (sectionUserCountID[sectionSeqID].indexOf(annotation.user_id) === -1) {
            sectionUserCount[sectionSeqID]++
            sectionUserCountID[sectionSeqID].push(annotation.user_id)
            //console.log('push', sectionUserCountID[sectionSeqID])
          }
        })
        
        //console.log(sectionUserCountID)
        
        profiler.mark('after annotations.forEach()')
        
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
       
        let seqID = maxSectionID + ''
        return {
          annotations: sectionAnnotations[seqID],
          myAnnotation: myAnnotations[seqID],
          users: sectionUsers[seqID],
          userCount: sectionUserCount[seqID]
        }
      })
      
      profiler.finish()
      
      return output
    }
    
    Model.getSectionAnnotations = async function (webpage, user, query) {
      let cacheKey = Cache.key(`Annotation.getSectionAnnotations`, query)
      return await Cache.rememberWait([webpage, user], cacheKey, 2, async () => {
        //let itemsPerPage = Config.get('view.itemsPerPage')
        //console.log(query)
        return await this.findByWebpageGroupPosition(webpage, user, {
          onlySectionAnnotation: true,
          seq_id: query.seq_id,
          page: query.page,
          focusUserID: query.focusUserID,
          withCount: true
        })
      })
    }
    
    Model.getSectionsChecklistAnnotation = async function (webpage, user, options = {}) {
      let profiler = new Profiler(1, 'Annotation.AnnotationSection.getSectionsChecklistAnnotation', webpage, user, options)
      
      let cacheKey = Cache.key(`getSectionsChecklistAnnotation`, options)
      //console.log('getSectionsChecklistAnnotation')
      
      let doQuery = async () => {
        //let itemsPerPage = Config.get('view.itemsPerPage')
        //console.log(query)
        options.onlySectionAnnotation = true
        options.findUserID = user.primaryKeyValue
        options.withCount = true
        options.page = 0
        //options.page = options.page
        
        //console.log('getSectionsChecklistAnnotation', options)
        
        profiler.mark('before findByWebpageGroupPosition()', options)
        //console.log({options})
        let annotations = await this.findByWebpageGroupPosition(webpage, user, options)
        //console.log(annotations.size())
        profiler.mark('findByWebpageGroupPosition()')
        
        if (typeof(annotations.toJSON) === 'function') {
          annotations = annotations.toJSON()
        }
        else {
          annotations = []
        }
        
        //console.log(annotations.length)
        
        profiler.mark('annotations.toJSON()')
        
        let map = {}
        let maxSectionSeqID = -1
        
        annotations.forEach(annotation => {
          let section_id = annotation.anchorPositions[0].section_id
          //console.log(seq_id)
          if (section_id > maxSectionSeqID) {
            maxSectionSeqID = section_id
          }
          map[section_id] = annotation
        })
        
        profiler.mark('annotations.forEach()')
        
        let o = new Array(maxSectionSeqID + 1)
        Object.keys(map).forEach(section_id => {
          let i = parseInt(section_id, 10)
          o[i] = map[section_id]
        })
        
        profiler.before('return output')
        //console.log(o)
        return o
      } // let doQuery = async () => {
      
      //let output = await Cache.rememberWait([webpage, user, 'Annotation'], cacheKey, doQuery)
      let output = await doQuery()
      profiler.mark('before finish')
      
      profiler.finish()
      return output
    } // Model.getSectionsChecklistAnnotation = async function (webpage, user, query) {
    
    Model.getMainIdeasInSection = async function (webpage, user, query) {
      let cacheKey = Cache.key(`Annotation.getSectionAnnotationsDraft`, query)
      return await Cache.rememberWait([webpage, user], cacheKey, 2, async () => {
        let { section_id } = query
        
        let annotations = await this.findByWebpageGroupPosition(webpage, user, {
          findUserID: user.primaryKeyValue,
          findType: 'MainIdea',
          section_id: section_id,
          withAnchorText: true
        })
        
        //console.log(annotations.size())
        
        if (annotations.size() === 0) {
          return ''
        }
        
        annotations = annotations.toJSON()
        
        // 依照順序排序
        let noteMap = {}
        let addedNote = {}
        
        annotations.forEach(annotation => {
          //let note = annotation.notes[0].note
          let note = annotation.notes.map(n => {
            let text = n.note
            text = TokenizationHelper.htmlToText(text)
            text = TokenizationHelper.removePunctuations(text)
            return text
          }).join(' / ').trim()
          
          let anchorText = annotation.anchorPositions.map(a => {
            let text = a.anchor_text
            text = TokenizationHelper.htmlToText(text)
            text = TokenizationHelper.removePunctuations(text)
            return text
          }).join(' ').trim()
          
          if (note !== anchorText) {
            if (StringHelper.countWords(anchorText) > 10) {
              anchorText = anchorText.slice(0, 10) + '...'
            }
            note = anchorText + ': ' + note
          }
          
          let seqID = annotation.anchorPositions[0].seq_id + ''
          
          if (Array.isArray(noteMap[seqID]) === false) {
            noteMap[seqID] = []
          }
          
          if (Array.isArray(addedNote[seqID]) === false) {
            addedNote[seqID] = []
          }
          
          if (addedNote[seqID].indexOf(note) > -1) {
            return false // 不加入重複的字
          }
          addedNote[seqID].push(note)
          
          noteMap[seqID].push({
            seq_id: annotation.anchorPositions[0].start_pos,
            start_pos: annotation.anchorPositions[0].start_pos,
            note: note
          })
        })
        
        Object.keys(noteMap).forEach(seqID => {
          noteMap[seqID].sort((a, b) => {
            return a.start_pos - b.start_pos
          })
        })
        
        let seqIDList = Object.keys(noteMap).map(seqIDString => parseInt(seqIDString, 10))
        seqIDList.sort()
        
        
        // 
        
        //return '<ul>\n<li>' + noteMap.map(annotation => {
        //  return annotation.note
        //}).join('</li>\n<li>') + '</li>\n</ul>'
        
        let output = []
        
        seqIDList.forEach(seqIDInt => {
          let notes = noteMap[seqIDInt + ''].map(annotation => annotation.note)
          output.push(`<ul><li>${notes.join('</li><li>')}</li></ul>`)
        })
        
        return output.join('\n<hr />\n')
      })
    } // Model.getMainIdeasInSection = async function (webpage, user, query) {
  } // register (Model) {
}

module.exports = AnnotationSection
