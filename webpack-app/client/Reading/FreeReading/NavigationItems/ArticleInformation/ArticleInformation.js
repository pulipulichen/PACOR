import $ from 'jquery'

let ArticleInformation = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      sections: null,
      paragraphies: null,
      wordCount: 0,
      paragraphyCount: 0,
      sectionCount: 0,
      headings: [],
      images: []
    }
  },
//  components: {
//  },
//  computed: {
//  },
  methods: {
    show () {
      this.calculating()
      this.$refs.Modal.show()
    },
    calculating () {
      this.sections = $('[data-pacor-section-seq-id]')
      this.paragraphies = this.sections.children()

      let text = this.lib.StringHelper.htmlToTextTrim(this.sections.html(), true)
      this.wordCount = this.lib.StringHelper.countWords(text)

      this.paragraphyCount = this.paragraphies.length

      this.sectionCount = this.sections.length

      let headings = []
      //console.log(this.sections.find('h1,h2,h3,h4,h5,h6').length)
      this.sections.find('h1,h2,h3,h4,h5,h6').each((i, heading) => {
        headings.push(heading.innerText.trim())
      })
      this.headings = headings

      let images = []
      this.sections.find('img').each((i, image) => {
        images.push({
          src: image.src,
          title: (image.title ? image.title : image.alt)
        })
      })
      this.images = images
    }
  } // methods
}

export default ArticleInformation