'use strict'

const Cache = use('Cache')
//const WebpageGroupModel = use('App/Models/WebpageGroup')

class WebpageAnalyze {

  register(Model) {

    Model.prototype.analyzeIdeaUnits = async function (paragraphs) {
      console.log('@TODO analyzeIdeaUnits')
    }

  } // register (Model) {
}

module.exports = WebpageAnalyze
