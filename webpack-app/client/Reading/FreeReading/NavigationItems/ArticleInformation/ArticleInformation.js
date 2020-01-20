import $ from 'jquery'
import CopyPasteHelper from './libs/CopyPasteHelper.js'

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
  computed: {
    articleTitle () {
      return document.title
    },
    readingProgressModules () {
      return this.status.readingConfig.readingProgressModules
    },
    preImaginaryConfig () {
      return this.readingProgressModules.PreImaginary
    }
  },
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
    copyPreImaginaryInstructionHtml() {
      let section = this.$refs.SectionPreImaginary
      let $section = $(section).clone()
      //console.log(section)
      $section.find('*').each((i, ele) => {
        console.log(ele.attributes)
        $.each(ele.attributes, function(j, attr) {
          if (!attr) {
            return false
          }
          //console.log(j, attr)
          // this.attributes is not a plain object, but an array
          // of attribute nodes, which contain both the name and value
          let name = attr.name
          if (name.startsWith('data-v-')) {
            $(ele).removeAttr(name)
          }
        });
      })
      
      section = $section[0]
      console.log(section)
      
      CopyPasteHelper.copyPlainText(section.innerHTML)
    }
  } // methods
}

export default ArticleInformation