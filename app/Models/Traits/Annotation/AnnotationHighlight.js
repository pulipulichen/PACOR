'use strict'

const Cache = use('Cache')
const TypeHelper = use('App/Helpers/TypeHelper')

class AnnotationHighlight {

  register(Model) {
    /**
     * // "type:textContent|28$198$2$confused-clarified$pacor-paragraph-id-2"
     */
    Model._convertToHighlighArray = function (annotations, user) {
      
      if (typeof (annotations.toJSON) === 'function') {
        annotations = annotations.toJSON()
      }
      
      // -------------------------------------------
      
      let highlightTypes = {}
      
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
          let {paragraph_id, start_pos, end_pos} = position
          if (!paragraph_id) {
            return null
          }
          
          if (!highlightTypes[highlightType][paragraph_id]) {
            highlightTypes[highlightType][paragraph_id] = {}
          }
          
          for (let i = start_pos; i <= end_pos; i++) {
            highlightTypes[highlightType][paragraph_id][i] = true
          }
        })
      })
      
      // -------------------------------------------
      // 再來重新合併
      let highlights = []

      for (let highlightType in highlightTypes) {
        let type = highlightType.slice(highlightType.indexOf('-') + 1)
        for (let paragraph_id in highlightTypes[highlightType]) {
          let highlight = {
            type,
            highlightType,
            paragraph_id
          }
          let lastI = null
          for (let i in highlightTypes[highlightType][paragraph_id]) {
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
              highlight.end_pos = lastI
              highlights.push(highlight)
              
              highlight = {
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
      return highlights
    }

    /**
     * // "type:textContent|28$198$2$confused-clarified$pacor-paragraph-id-2"
     */
    Model._convertHighlighArrayToString = async function (highlights, webpage, user) {
      if (highlights.length === 0) {
        return 0
      }

      if (highlights.length > 1) {
        let config = await user.getCurrentReadingProgressStepConfig(webpage)
        if (!config || !config.annotation) {
          let stepName = await user.getCurrentReadingProgressStepName(webpage)
          throw new Error('Types of annotation in config is not defined.\n'
                  + 'Step name: ' + stepName
                  + 'Config: ' + JSON.stringify(config))
        }
        
        let configTypes = config.annotation.types

        let typesArray = []
        configTypes.forEach(() => {
          typesArray.push([])
        })

        highlights.forEach(h => {
          let i = configTypes.indexOf(h.type)
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

    Model.getOthersHighlightsArrayByWebpageGroup = async function (webpage, user, options) {
      const doQuery = async evt => {
        //console.log('getOthersHighlightsArrayByWebpageGroup', 1)
        //console.log('getOthersHighlightsArrayByWebpageGroup', options)
        if (!options) {
          options = {}
        }
        options.limit = 50
        options.exceptTypes = ['SectionMainIdea']
        
        let annotations = await this.findOthersByWebpageGroup(webpage, user, options)
        //console.log('getOthersHighlightsArrayByWebpageGroup', 2)
        return this._convertToHighlighArray(annotations, user)
      }

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
    }

    Model.getHighlightsByWebpageGroup = async function (webpage, user, query) {
      //console.log('getHighlightsByWebpageGroup', 1)
      let highlights = await this.getMyHighlightsArrayByWebpageGroup(webpage, user, query)
      if (Array.isArray(highlights) === false) {
        highlights = []
      }
      //console.log(highlights)
      //console.log('getHighlightsByWebpageGroup', 2)
      let othersHighlights = await this.getOthersHighlightsArrayByWebpageGroup(webpage, user, query)
      //console.log('getHighlightsByWebpageGroup', 3)
      highlights = highlights.concat(othersHighlights)
      //console.log('getHighlightsByWebpageGroup', 4)
      return this._convertHighlighArrayToString(highlights, webpage, user)
    }

    Model.getMyHighlightsByWebpageGroup = async function (webpage, user, query) {
      //console.log('getMyHighlightsByWebpageGroup')
      let highlights = await this.getMyHighlightsArrayByWebpageGroup(webpage, user, query)
      //console.log(highlights)
      return this._convertHighlighArrayToString(highlights, webpage, user)
    }

    Model.getOthersHighlightsByWebpageGroup = async function (webpage, user, query, session) {
      let highlights = await this.getOthersHighlightsArrayByWebpageGroup(webpage, user, query)
      return this._convertHighlighArrayToString(highlights, webpage, user)
    }

    Model.getMyHighlightsArrayByWebpageGroup = async function (webpage, user, query) {
      const doQuery = async evt => {
        query.exceptTypes = ['SectionMainIdea']
        let annotations = await this.findMyByWebpageGroup(webpage, user, query)
        return this._convertToHighlighArray(annotations, user)
      }

      return await doQuery()
    }
  } // register (Model) {
}

module.exports = AnnotationHighlight
