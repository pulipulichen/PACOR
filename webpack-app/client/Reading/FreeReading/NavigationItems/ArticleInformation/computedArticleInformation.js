export default function (ArticleInformation) {
  ArticleInformation.computed.articleTitle = function () {
    return document.title
  }
  ArticleInformation.computed.readingProgressModules = function () {
    return this.status.readingConfig.readingProgressModules
  }
  ArticleInformation.computed.preImaginaryConfig = function () {
    return this.readingProgressModules.PreImaginary
  }
  ArticleInformation.computed.titleHTML = function () {
    return this.$t(`This article is titled <span class='highlight'>&quot;{0}&quot;</span>.`, [this.articleTitle])
  }
  ArticleInformation.computed.timeLimitTypeStart = function () {
    return this.$t(`The time limit is <span class='highlight'>{0} minutes</span> and the countdown starts when you start typing.`, [this.preImaginaryConfig.limitMinutes])
  }
  ArticleInformation.computed.timeLimitAutoStart = function () {
    return this.$t(`The time limit is <span class='highlight'>{0} minutes</span> and the countdown starts now.`, [this.preImaginaryConfig.limitMinutes])
  }
}