import $ from 'jquery'

let Instruction = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      //sections: null,
      paragraphies: null,
      wordCount: 0,
      paragraphyCount: 0,
      sectionCount: 0,
      headings: [],
      images: [],
      keywordEditorThumbnail: this.config.baseURL + '/imgs/keyword-editor.png'
    }
  },
//  components: {
//  },
  computed: {
    articleTitle () {
      return document.title
    },
    readingProgressModules () {
      return this.status.readingConfig.readingProgressModules
    },
//    preImaginaryConfig () {
//      return this.readingProgressModules.PreImaginary
//    },
//    postRecallConfig () {
//      return this.readingProgressModules.PostRecall
//    },
    limitMinutes () {
      return this.lib.auth.currentStepConfig.limitMinutes
    },
    titleHTML () {
      return this.$t(`This article is titled <span class='highlight'>&quot;{0}&quot;</span>.`, [this.articleTitle])
    },
    timeLimitTypeStart () {
      return this.$t(`The time limit is <span class='highlight'>{0} minutes</span> and the countdown starts when you start typing.`, [this.limitMinutes])
    },
    timeLimitAutoStart () {
      return this.$t(`The time limit is <span class='highlight'>{0} minutes</span> and the countdown starts now.`, [this.limitMinutes])
    },
    timeLimitClickButtonStart () {
      return this.$t(`The time limit is <span class="highlight">{0} minutes</span> and the countdown starts when you click "Start Answer and Countdown" button.`, [this.limitMinutes])
    },
    isDiffMode () {
      let isDiffMode = false
      if (this.lib.auth
              && this.lib.auth.currentStepConfig.preloadPreImaginaryAnswer) {
        isDiffMode = this.lib.auth.currentStepConfig.preloadPreImaginaryAnswer
      }
      return isDiffMode
    },
    sections () {
      let selector = this.status.readingConfig.selector
      
      let article
      for (let i = 0; i < selector.article.length; i++) {
        let s = selector.article[i]
        let e = $(s + ':first')
        if (e.length === 1) {
          article = e
          break
        }
      }
      
      let sections
      if (article) {
        for (let i = 0; i < selector.section.length; i++) {
          let s = selector.section[i]
          let e = article.children(s)
          if (e.length > 0) {
            sections = e
            break
          }
        }
      }
      
      return sections
    }
  },
//  watch: {
//  },
  mounted() {
    this.calculating()
  },
  methods: {
    calculating () {
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
      this.sections.find('img:not(.keyword-editor-thumbnail)').each((i, image) => {
        
        // 這邊要做動態縮圖
        
        images.push({
          src: this.resizeImage(image),
          title: (image.title ? image.title : image.alt)
        })
      })
      this.images = images
    },
    resizeImage (image) {
      let oCanvas = document.createElement("canvas")
      let oCtx = oCanvas.getContext("2d")
      
      let oColorImg = image
      let nWidth = oColorImg.offsetWidth
      let nHeight = oColorImg.offsetHeight
      
      let maxSize = 200
      if (nWidth > nHeight) {
        if (nWidth > 200) {
          nHeight = 200 * (nHeight / nWidth)
          nWidth = 200
        }
      }
      else {
        if (nHeight > 200) {
          nWidth = 200 * (nWidth / nHeight)
          nHeight = 200
        }
      }
      
      oCanvas.width = nWidth
      oCanvas.height = nHeight
      oCtx.drawImage(oColorImg, 0, 0, oColorImg.offsetWidth, oColorImg.offsetHeight, 0,0,nWidth,nHeight);
      
      return oCanvas.toDataURL()
    },
  } // methods
}

export default Instruction