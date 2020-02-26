export default function (ArticleInformation) {
  ArticleInformation.data = function () {    
    this.$i18n.locale = this.config.locale
    return {
      sections: null,
      paragraphs: null,
      wordCount: 0,
      paragraphCount: 0,
      sectionCount: 0,
      headings: [],
      images: []
    }
  },
}