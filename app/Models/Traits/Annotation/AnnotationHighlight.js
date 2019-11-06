'use strict'

const Cache = use('Cache')

class AnnotationHighlight {

  register(Model) {
    /**
     * // "type:textContent|28$198$2$confused-clarified$pacor-paragraph-id-2"
     */
    Model._convertToHighlighArray = function (annotations, user) {
      let highlights = []

      if (typeof (annotations.toJSON) === 'function') {
        annotations = annotations.toJSON()
      }

      annotations.forEach(annotation => {
        let type = annotation.type
        let highlightType = type
        if (annotation.user_id === user.primaryKeyValue) {
          highlightType = 'my-' + type
        } else {
          highlightType = 'others-' + type
        }

        annotation.anchorPositions.forEach(position => {
          position.type = type
          position.highlightType = highlightType
          highlights.push(position)
        })
      })
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
    }

    Model.getOthersHighlightsArrayByWebpageGroup = async function (webpage, user, options) {
      const doQuery = async evt => {
        let annotations = await this.findOthersByWebpageGroup(webpage, user, options)
        return this._convertToHighlighArray(annotations, user)
      }

      if (options !== undefined) {
        return await doQuery()
      } else {
        let cacheKey = Cache.key(`Annotation.getOthersHighlightsArrayByWebpageGroup`, webpage, user)
        return await Cache.rememberWait(Cache.buildTags(webpage, user, this), cacheKey, 2, async () => {
          let result = await doQuery()
          //await Cache.put(cacheKey, result, 2)
          return result
        })  // return await Cache.get(cacheKey, async () => {
      }
    }


    Model.getHighlightsByWebpageGroup = async function (webpage, user, query) {
      let highlights = await this.getMyHighlightsArrayByWebpageGroup(webpage, user, query)
      //console.log(highlights)
      let othersHighlights = await this.getOthersHighlightsArrayByWebpageGroup(webpage, user, query)
      //console.log(othersHighlights)

      highlights = highlights.concat(othersHighlights)
      return this._convertHighlighArrayToString(highlights, webpage, user)
    }

    Model.getMyHighlightsByWebpageGroup = async function (webpage, user, query) {
      let highlights = await this.getMyHighlightsArrayByWebpageGroup(webpage, user, query)
      return this._convertHighlighArrayToString(highlights, webpage, user)
    }

    Model.getOthersHighlightsByWebpageGroup = async function (webpage, user, query) {
      let highlights = await this.getOthersHighlightsArrayByWebpageGroup(webpage, user, query)
      return this._convertHighlighArrayToString(highlights, webpage, user)
    }

    Model.getMyHighlightsArrayByWebpageGroup = async function (webpage, user, query) {
      const doQuery = async evt => {
        let annotations = await this.findMyByWebpageGroup(webpage, user, query)
        return this._convertToHighlighArray(annotations, user)
      }

      return await doQuery()
    }
  } // register (Model) {
}

module.exports = AnnotationHighlight