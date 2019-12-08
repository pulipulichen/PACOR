'use strict'

const Cache = use('Cache')
const ExceptionHelper = use('App/Helpers/ExceptionHelper')

class AnnotationHighlightOthers {

  register(Model) {
    
    Model.getOthersHighlightsArrayByWebpageGroup = async function (webpage, user, options, session) {
      const doQuery = async () => {
        //console.log('getOthersHighlightsArrayByWebpageGroup', 1)
        //console.log('getOthersHighlightsArrayByWebpageGroup', options)
        if (!options) {
          options = {}
        }
        
        let config = await user.getCurrentReadingProgressStepAnnotationConfig(webpage)
        let limit = config.otherHighlightBatchSize
        if (typeof(limit) !== 'number') {
          console.error('config.otherHighlightBatchSize is not a number')
          console.log(config)
          return false
        }
        
        options.limit = limit
        options.exceptTypes = ['SectionMainIdea']
        
        let area = await Model._getAreaFromSession(webpage, user, options, session, user)
        this._consoleLogArea('after find', area)
        if (area && area.keepSearch) {
          options.exceptArea = area
        }
        
        let annotations = await this.findOthersByWebpageGroup(webpage, user, options)
        //console.log('getOthersHighlightsArrayByWebpageGroup', '最終目標應該要有')
        let highlights = this._convertToHighlighArray(annotations, user)
        //console.log('getOthersHighlightsArrayByWebpageGroup', JSON.stringify(highlights, null, 2))
        //console.log('getOthersHighlightsArrayByWebpageGroup', '最終目標應該要有', highlights.length)
        // getOthersHighlightsArrayByWebpageGroup 最終目標應該要有 28
        
        await this._analyzeHighlighsArea(highlights, options, session, webpage, user, area)
        
        return highlights
      }
      
      //console.log('getOthersHighlightsArrayByWebpageGroup', '是誰呼叫我？', ExceptionHelper.getStackTraceString())
      return doQuery()
      /*
      if (options !== undefined) {
        return await doQuery()
      } else {
        let cacheKey = Cache.key(`Annotation.getOthersHighlightsArrayByWebpageGroup`, webpage, user)
        return await Cache.rememberWait([webpage, user, 'Annotation'], cacheKey, 2, async () => {
          let result = await doQuery()
          //await Cache.put(cacheKey, result, 2)
          return result
        })  // return await Cache.get(cacheKey, async () => {
      }
       */
    }
    
    Model._getAreaFromSession = async function (webpage, user, query, session) {
      let area
      let { afterTime, sessionToken } = query
      //console.log('_getAreaFromSession', query)
      if (afterTime) {
        if (sessionToken) {
          //area = session.get('ha.' + sessionToken)
          let cacheKey = Cache.key('highlightArea', sessionToken)
          area = await Cache.getWithTags([webpage, user, 'Highlight'], cacheKey)
          //console.log('_getAreaFromSession 3', 'ha.' + sessionToken, area)
        }
        //console.log('_getAreaFromSession 4', area)
        if (area && area.keepSearch) {
          return area
        }
      }
      //else {
        //session.forget('ha.' + sessionToken)
        //await 
      //}
    }
    
    Model.getOthersHighlightsByWebpageGroup = async function (webpage, user, query, session) {
      let area = await Model._getAreaFromSession(webpage, user, query, session)
      //console.log('getOthersHighlightsByWebpageGroup', 1, area)
      if (area && area.keepSearch) {
        query.exceptArea = area
      }
      
      //console.log('getOthersHighlightsByWebpageGroup', 2, JSON.stringify(query, null, 2))
      
      let highlights = await this.getOthersHighlightsArrayByWebpageGroup(webpage, user, query, session)
      //console.log('重複呼叫了嗎？', highlights.length)
      //await this._analyzeHighlighsArea(highlights, query, session, webpage, user, area)
      
      return this._convertHighlighArrayToString(highlights, webpage, user)
    }
    
    Model._analyzeHighlighsArea = async function (highlights, query, session, webpage, user, area) {
      //console.log('_analyzeHighlighsArea', 1, highlights.length)
      //console.log('_analyzeHighlighsArea', '是誰呼叫我？', ExceptionHelper.getStackTraceString())
      return new Promise(async (resolve, reject) => {
//        let area
//        
//        
        let { sessionToken } = query
        let cacheKey = Cache.key('highlightArea', sessionToken)
//        
//        if (sessionToken) {
//          //area = session.get('ha.' + sessionToken)
//          area = await Cache.getWithTags([webpage, user, 'highlight'], cacheKey, this._createEmptyArea())
//        }
        
        if (!area) {
          area = this._createEmptyArea()
        }
        
        //let config = await webpage.getConfig()
        let config = await user.getCurrentReadingProgressStepAnnotationConfig(webpage)
        let limit = config.otherHighlightBatchSize
        if (typeof(limit) !== 'number') {
          console.error('config.otherHighlightBatchSize is not a number')
          console.log(config)
          return false
        }
        
        //console.log('_analyzeHighlighsArea', 2, highlights.length)
        if (highlights.length === 0) {
        //if (false) {
          area.keepSearch = false
        }
        else {
          highlights.forEach(highlight => {
            //console.log('highlights.forEach(highlight => {', 3, highlight)
            this._analyzeHighlightArticleArea(area, highlight)
            this._analyzeHighlightParagraphArea(area, highlight)
          })
        }
        
        //console.log('put session', 'ha.' + sessionToken)
        this._consoleLogArea('before save', area)
        //session.put('ha.' + sessionToken, area)
        //session.commit()
        
        //await Cache.getWithTags([webpage, user, 'Highlight'], cacheKey)
        
        
        await Cache.foreverWithTags([webpage, user, 'Highlight'], cacheKey, area)
        resolve(true)
      })  // return new Promise(async (resolve, reject) => {
    } // Model._analyzeHighlighsArea = async function (highlights, query, session) {
    
    Model._consoleLogArea = function (message, area) {
      if (!area) {
        return
      }
      let area2 = JSON.parse(JSON.stringify(area))
      for (let seq_id in area2.paragraphs) {
        //delete area2.paragraphs[seq_id].highlights
        let highlightsArray = []
        let highlight = []
        let lastI = null
        for (let i in area2.paragraphs[seq_id].highlights) {
          lastI = i
          if (area2.paragraphs[seq_id].highlights[i] === true) {
            if (!highlight[0]) {
              highlight[0] = i
            }
          }
          else {
            highlight[1] = i
            highlightsArray.push(highlight)
          }
        }
        
        if (highlight[0]) {
          //console.log('最後一個是', lastI)
          highlight[1] = lastI
        }
        highlightsArray.push(highlight)
        
        area2.paragraphs[seq_id].highlights = highlightsArray
      }

      console.log(message, JSON.stringify(area2, null, 2))
    }
    
    Model._analyzeHighlightArticleArea = function (area, highlight) {
      //console.log(JSON.stringify(highlight, null, 2))
      let { seq_id } = highlight
      
      if (typeof(seq_id) !== 'number') {
        throw new Error('highlight lost seq_id')
      }
          
      if (area.article.minSeqID === null
              || area.article.minSeqID > seq_id) {
        area.article.minSeqID = seq_id
      }
      
      if (area.article.maxSeqID === null
              || area.article.maxSeqID < seq_id) {
        area.article.maxSeqID = seq_id
      }
      
      //area.article.seqIDList[seq_id] = true
      if (area.article.seqIDList.indexOf(seq_id) === -1) {
        area.article.seqIDList.push(seq_id)
      }
    }
    
    Model._analyzeHighlightParagraphArea = function (area, highlight) {
      let { seq_id, start_pos, end_pos } = highlight
      
      let paragraphArea
      if (!area.paragraphs[seq_id + '']) {
        area.paragraphs[seq_id + ''] = this._createEmptyParagraphArea()
      }
      paragraphArea = area.paragraphs[seq_id + '']
      
      // ----------------------
      
      if (paragraphArea.minPos === null 
              || paragraphArea.minPos > start_pos) {
        //if (seq_id === 8) {
        //  console.log(seq_id, paragraphArea.minPos, start_pos)
        //}
        paragraphArea.minPos = start_pos
      }
      
      if (paragraphArea.maxPos === null 
              || paragraphArea.maxPos < end_pos) {
        paragraphArea.maxPos = end_pos
      }
      
      // ------------------------
      let highlights = paragraphArea.highlights
      for (let i = start_pos; i <= end_pos; i++) {
        i = i + ''
        if (!highlights[i]) {
          highlights[i] = true
        }
      }
      paragraphArea.highlights = highlights
      
      let gap = []
      paragraphArea.gaps = []
      for (let i = paragraphArea.minPos + 1; i < paragraphArea.maxPos - 1; i++) {
        i = i + ''
        if (highlights[i] === true) {
          if (typeof(gap[0]) !== 'number') {
            continue
          }
          else {
            gap[1] = i - 1
            
            paragraphArea.gaps.push(gap)
            
            gap = []
            //i++
            continue
          }
        }
        else if (typeof(gap[0]) !== 'number') {
          gap[0] = i
        }
      }
    }
    
    Model._createEmptyArea = function () {
      return {
        keepSearch: true,
        article: {
          minSeqID: null,
          maxSeqID: null,
          seqIDList: []
        },
        paragraphs: {}
      }
    }
    
    Model._createEmptyParagraphArea = function () {
      return {
        minPos: null,
        maxPos: null,
        // 由兩兩數字組成，表示這兩個數字是空格的開頭與結尾
        gaps: [],
        highlights: {},
      }
    }
  } // register (Model) {
}

module.exports = AnnotationHighlightOthers
