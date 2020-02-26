import $ from 'jquery'
import CopyPasteHelper from './libs/CopyPasteHelper.js'

export default function (ArticleInformation) {
  ArticleInformation.methods.show = function () {
    this.calculating()
    this.$refs.Modal.show()
  }
  ArticleInformation.methods.calculating = function () {
    this.sections = $('[data-pacor-section-seq-id]')
    this.paragraphs = this.sections.children(':not(.image-label)')

    let text = []
    this.sections.each((i, ele) => {
      text.push(this.lib.StringHelper.htmlToTextTrim(ele.innerHTML, true))
    })

    text = text.join(' ')

    this.wordCount = this.lib.StringHelper.countWords(text)

    this.paragraphCount = this.paragraphs.length

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
  }
  ArticleInformation.methods.resizeImage = function (image) {
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
    } else {
      if (nHeight > 200) {
        nWidth = 200 * (nWidth / nHeight)
        nHeight = 200
      }
    }

    oCanvas.width = nWidth
    oCanvas.height = nHeight
    oCtx.drawImage(oColorImg, 0, 0, oColorImg.offsetWidth, oColorImg.offsetHeight, 0, 0, nWidth, nHeight);

    return oCanvas.toDataURL()
  }
  ArticleInformation.methods.removeDataAttr = async function (ele) {
    //console.log(ele.attributes)
    //$.each(ele.attributes, function(j, attr) {
    let i = 0
    //console.log(ele.attributes[''])
    //console.log(typeof(ele.attributes[(1 + '')]), ele.attributes[(1 + '')])
    while (typeof (ele.attributes[(i + '')]) === 'object') {
      let attr = ele.attributes[(i + '')]

//        while (attr === undefined) {
//          console.log(attr, i)
//          //continue
//          await this.lib.VueHelper.sleep(100)
//        }
      if (attr === undefined) {
        return false
      }

      //console.log(j, attr)
      // this.attributes is not a plain object, but an array
      // of attribute nodes, which contain both the name and value
      let name = attr
      if (typeof (attr) === 'object' && typeof (attr.name) === 'string') {
        name = attr.name
      }

      //console.log(name)

      if (name.startsWith('data-v-')) {
        //console.log(name)
        $(ele).removeAttr(name)
      }
      i++
    }
    //});
  }
  ArticleInformation.methods.copyHTML = async function ($section) {
    //console.log(section)

    let elements = $section.find('*')
    for (let i = 0; i < elements.length; i++) {
      let ele = elements.eq(i)[0]
      //console.log(ele.attributes)
      await this.removeDataAttr(ele)
    }

    $section.find('.highlight').css('background-color', 'yellow')

    $section.find('img[src]').each(function (i, img) {
      let filename = 'Questionnaire-img' + i + '.png'
      img.src = filename
    })

    let section = $section[0]
    //console.log(section.innerHTML)
    let html = section.innerHTML

    //console.log(html)
    let id = html.slice(html.indexOf(" data-v-"), html.indexOf('="">'))
    html = html.split(id + '=""').join('')

    html = html.split('</li>').join('</li>\n')
    html = html.split('</p>').join('</p>\n')
    html = html.split('img src=').join('img \nsrc=')
    html = html.split('<span class="image-container">').join('\n<span class="image-container">')

    CopyPasteHelper.copyPlainText(html)
  }
  ArticleInformation.methods.copyPreImaginaryInstructionHtml = async function () {
    //let section = this.$refs.SectionPreImaginary
    let $section = $('section.SectionPreImaginary.instruction').clone()
    this.copyHTML($section)
  }
  ArticleInformation.methods.copyPostRecallInstructionHtml = async function () {
    //let section = this.$refs.SectionPreImaginary
    let $section = $('section.SectionPostRecall.instruction').clone()
    this.copyHTML($section)
  }
  ArticleInformation.methods.downloadImage = function (i, base64) {
    let filename = 'Questionnaire-img' + i + '.png'
    this.downloadBase64File(base64, filename)
  }
  ArticleInformation.methods.downloadBase64File = function (contentBase64, fileName) {
    const linkSource = contentBase64
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = fileName;
    downloadLink.click();
  }
  
  ArticleInformation.methods.sendIdeaUnitsAnalyze = function () {
    let paragraphs = []
    this.lib.RangyManager.sectionNodes.children().each((i, paragraph) => {
      
      let text = this.lib.StringHelper.htmlToText(paragraph, true)
      if (text.trim() !== '') {
        paragraphs.push(text)
      }
    }) 
    
    this.lib.AxiosHelper.postNewWindow('/', {
      paragraphs
    })
  }
}