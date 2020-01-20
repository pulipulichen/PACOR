'use strict'

const Cache = use('Cache')
const TypeHelper = use('App/Helpers/TypeHelper')
const ExceptionHelper = use('App/Helpers/ExceptionHelper')

const { HttpException } = use('@adonisjs/generic-exceptions') 

class AnnotationHighlight {

  register(Model) {
    /**
     * // "type:textContent|28$198$2$confused-clarified$pacor-paragraph-id-2"
     */
    Model._convertToHighlighArray = function (annotations, user) {
      
      if (typeof (annotations.toJSON) === 'function') {
        annotations = annotations.toJSON()
      }
      
//      (async function () {
//        let allIdList = await Cache.get(user.primaryKeyValue + '._convertToHighlighArray', [])
//        let idList = annotations.map(annotation => annotation.id)
//        if (idList.length === 0) {
//          return
//        }
//        
//        idList.forEach(id => {
//          if (allIdList.indexOf(id) === -1) {
//            allIdList.push(id)
//          }
//          else {
//            console.error(`${id} is existed.`)
//          }
//        })
//        
//        await Cache.forever(user.primaryKeyValue + '._convertToHighlighArray', allIdList)
//
//        
//        console.log('_convertToHighlighArray', idList)
//      })()
        
      
      // -------------------------------------------
      
      let highlightTypes = {}
      
      let seqIDMap = {}
      
      //console.log(annotations.length)
      annotations.forEach(annotation => {
        if (annotation.anchorPositions.length === 1
                && annotation.anchorPositions[0].type !== 'textContent') {
          return null
        }
        
        let type = annotation.type
        let highlightType = type
        if (annotation.user_id === user.primaryKeyValue) {
          highlightType = 'my-' + type
        } else {
          highlightType = 'others-' + type
        }
        
        if (!highlightTypes[highlightType]) {
          highlightTypes[highlightType] = {}
        }

        annotation.anchorPositions.forEach(position => {
          //position.type = type
          //position.highlightType = highlightType
          //highlights.push(position)
          let {paragraph_id, start_pos, end_pos, seq_id} = position
          if (!paragraph_id) {
            return null
          }
          
          seqIDMap[paragraph_id] = seq_id
          
          if (!highlightTypes[highlightType][paragraph_id]) {
            highlightTypes[highlightType][paragraph_id] = {}
          }
          
//          if (paragraph_id === 'pacor-paragraph-id-6') {
//            console.log({start_pos, end_pos})
//          }
          for (let i = start_pos; i < end_pos; i++) {
            highlightTypes[highlightType][paragraph_id][i] = true
          }
        })
      })
      
      //console.log(seqIDMap)
      
      // -------------------------------------------
      // 再來重新合併
      let highlights = []

      for (let highlightType in highlightTypes) {
        let type = highlightType.slice(highlightType.indexOf('-') + 1)
        for (let paragraph_id in highlightTypes[highlightType]) {
          let seq_id = seqIDMap[paragraph_id]
          
          let highlight = {
            seq_id,
            type,
            highlightType,
            paragraph_id
          }
          let lastI = null
          for (let i in highlightTypes[highlightType][paragraph_id]) {
//            if (paragraph_id === 'pacor-paragraph-id-6') {
//              console.log({paragraph_id, i})
//            }
            i = TypeHelper.parseInt(i)
            if (lastI === null) {
              highlight.start_pos = i
              lastI = i
            }
            else if (lastI === (i - 1) ) {
              lastI = i
            }
            else {
              // 跳下一個開始了
              highlight.end_pos = lastI + 1
              highlights.push(highlight)
              
              highlight = {
                seq_id,
                type,
                highlightType,
                paragraph_id,
                start_pos: i
              }
              lastI = i
            }
          } // for (let i in highlightTypes[highlightType][paragraph_id]) {
          
          if (typeof(highlight.start_pos) === 'number'
                  && typeof(lastI) === 'number' ) {
            highlight.end_pos = lastI
            highlights.push(highlight)
          }
        }
      }
      
      //console.log(highlights.length)
      //console.log(JSON.stringify(highlights, null, 2))
      return highlights
    }

    /**
     * // "type:textContent|28$198$2$confused-clarified$pacor-paragraph-id-2"
     */
    Model._convertHighlighArrayToString = async function (highlights, webpage, user) {
      //console.log(highlights, ExceptionHelper.getStackTrace())
      if (Array.isArray(highlights) === false 
              || highlights.length === 0) {
        return 0
      }

      if (highlights.length > 1) {
        let configTypes = await user.getStepHighlightAnnotationTypes(webpage)
        
        if (!configTypes 
                || Array.isArray(configTypes) === false 
                || configTypes.length === 0) {
          return undefined
        }

        let typesArray = []
        configTypes.forEach(() => {
          typesArray.push([])
        })

        highlights.forEach(h => {
          let i = configTypes.indexOf(h.type)
          if (i === -1 || !typesArray[i]) {
            throw new HttpException('type is undefined: ' + h.type)
          } 
          typesArray[i].push(h)
        })

        highlights = []
        typesArray.forEach(typeArray => {
          highlights = highlights.concat(typeArray)
        })

      }

      // --------------------------------

      let output = highlights.map((h, i) => {
        return [
          h.start_pos,
          h.end_pos,
          (i + 1),
          h.highlightType,
          h.paragraph_id
        ].join('$')
      })

      output.unshift('type:textContent')
      return output.join('|')
    }

    

    Model.getHighlightsByWebpageGroup = async function (webpage, user, query, session) {
      //console.log('getHighlightsByWebpageGroup', 1)
      let highlights = await this.getMyHighlightsArrayByWebpageGroup(webpage, user, query)
      if (Array.isArray(highlights) === false) {
        highlights = []
      }
      //console.log(highlights)
      //console.log('getHighlightsByWebpageGroup', 2)
      let othersHighlights = await this.getOthersHighlightsArrayByWebpageGroup(webpage, user, query, session)
      //console.log('getHighlightsByWebpageGroup', 3)
      if (othersHighlights.length > 0) {
        highlights = highlights.concat(othersHighlights)
      }
      //console.log('getHighlightsByWebpageGroup', 4)
      return this._convertHighlighArrayToString(highlights, webpage, user)
    }

    Model.getMyHighlightsByWebpageGroup = async function (webpage, user, query) {
      //console.log('getMyHighlightsByWebpageGroup')
      let highlights = await this.getMyHighlightsArrayByWebpageGroup(webpage, user, query)
      //console.log(highlights)
      return this._convertHighlighArrayToString(highlights, webpage, user)
    }

//    Model.getOthersHighlightsByWebpageGroup = async function (webpage, user, query, session) {
//      let highlights = await this.getOthersHighlightsArrayByWebpageGroup(webpage, user, query)
//      return this._convertHighlighArrayToString(highlights, webpage, user)
//    }

    Model.getMyHighlightsArrayByWebpageGroup = async function (webpage, user, query) {
      const doQuery = async evt => {
        let types = await user.getStepSectionAnnotationTypes(webpage)
        query.exceptTypes = types
        let annotations = await this.findMyByWebpageGroup(webpage, user, query)
        return this._convertToHighlighArray(annotations, user)
      }

      return await doQuery()
    }
  } // register (Model) {
}

module.exports = AnnotationHighlight
