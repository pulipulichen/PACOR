'use strict'

const Cache = use('Cache')

class AnnotationHighlightOthers {

  register(Model) {
    Model.getOthersHighlightsByWebpageGroup = async function (webpage, user, query, session) {
      let area
      let { sessionToken } = query
      if (sessionToken) {
        area = session.get('highlightArea.' + sessionToken)
      }
      if (area && area.keepSearch) {
        query.exceptArea = area
      }
      
      let highlights = await this.getOthersHighlightsArrayByWebpageGroup(webpage, user, query)
      
      this._analyzeHighlighsArea(highlights, query, session)
      
      return this._convertHighlighArrayToString(highlights, webpage, user)
    }
    
    Model._analyzeHighlighsArea = async function (highlights, query, session) {
      return new Promise(async (resolve, reject) => {
        let area
        let { sessionToken } = query
        if (sessionToken) {
          area = session.get('highlightArea.' + sessionToken)
        }
        if (!area) {
          area = this._createEmptyArea()
        }
        
        highlights.forEach(highlight => {
          this._analyzeHighlightArticleArea(area, highlight)
          this._analyzeHighlightParagraphArea(area, highlight)
        })
        
        if (highlights.length === 0) {
          area.keepSearch = false
        }
        
        session.put('highlightArea.' + sessionToken, area)
      })  // return new Promise(async (resolve, reject) => {
    } // Model._analyzeHighlighsArea = async function (highlights, query, session) {
    
    Model._analyzeHighlightArticleArea = function (area, highlight) {
      let { seq_id } = highlight
      
      if (!seq_id) {
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
      if (!area.paragraphs[seq_id]) {
        area.paragraphs[seq_id] = this._createEmptyParagraphArea
      }
      paragraphArea = area.paragraphs[seq_id]
      
      // ----------------------
      
      if (paragraphArea.minPos === null 
              || paragraphArea.minPos > start_pos) {
        paragraphArea.minPos = start_pos
      }
      
      if (paragraphArea.maxPos === null 
              || paragraphArea.maxPos < end_pos) {
        paragraphArea.maxPos = end_pos
      }
      
      // ------------------------
      for (let i = start_pos; i <= end_pos; i++) {
        if (!paragraphArea.highlights[i]) {
          paragraphArea.highlights[i] = true
        }
      }
      
      let gap = []
      paragraphArea.gaps = []
      for (let i = paragraphArea.minPos + 2; i < paragraphArea.maxPos - 1; i++) {
        if (paragraphArea.highlights[i]) {
          if (typeof(gap[0]) !== 'number') {
            continue
          }
          else {
            gap[1] = i - 1
            
            paragraphArea.gaps.push(gap)
            
            gap = []
            i++
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
        paragraphs: []
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
