'use strict'

const Cache = use('Cache')
const WebpageArticleModel = use('App/Models/WebpageArticle')

class WebpageAnalyze {

  register(Model) {

    Model.prototype.analyzeIdeaUnits = async function (paragraphs) {
      let article = await this.article().fetch()
      if (!article) {
        article = new WebpageArticleModel()
      }
      article.article = {paragraphs}
      await this.article().save(article)
    }

  } // register (Model) {
}

module.exports = WebpageAnalyze
