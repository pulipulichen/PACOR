let ResourceSearch = {
  props: ['lib', 'status', 'config'
    , 'propSelectIndex', 'propAnchorText', 'propQuestion'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      selectIndex: this.propSelectIndex,
      anchorText: this.propAnchorText,
      //question: this.lib.StringHelper.htmlToText(this.propQuestion)
      question: ''
    }
  },
//  components: {
//  },
  computed: {}, // computedResourceSearch.js
  watch: {
    propSelectIndex(propSelectIndex) {
      this.selectIndex = propSelectIndex
    },
    propAnchorText(propAnchorText) {
      this.anchorText = propAnchorText
    },
    //propQuestion(question) {
      //question = this.lib.StringHelper.htmlToText(question)
      //this.question = question
    //}
  },
//  mounted() {
//  },
  methods: {
    doSearch() {
      if (this.urlPattern === null) {
        return false
      }
      
      this.question = this.lib.StringHelper.htmlToText(this.propQuestion)
      
      let url = this.urlPattern.replace('{anchorText}', this.anchorTextQuery)
      url = url.replace('{question}', this.question)

      //window.open(url, '_blank')
      //window.open(url, windowname, "resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, width=" + w + ", height=" + h + ", left=" + x + ", top=" + y)

      let ratio = 0.8
      this._popupCenter(url, '_blank', screen.availWidth * ratio, screen.availHeight * ratio)
    },
    _popupCenter: function (url, title, w, h) {
      var userAgent = navigator.userAgent,
              mobile = function () {
                return /\b(iPhone|iP[ao]d)/.test(userAgent) ||
                        /\b(iP[ao]d)/.test(userAgent) ||
                        /Android/i.test(userAgent) ||
                        /Mobile/i.test(userAgent);
              },
              screenX = typeof window.screenX !== 'undefined' ? window.screenX : window.screenLeft,
              screenY = typeof window.screenY !== 'undefined' ? window.screenY : window.screenTop,
              outerWidth = typeof window.outerWidth !== 'undefined' ? window.outerWidth : document.documentElement.clientWidth,
              outerHeight = typeof window.outerHeight !== 'undefined' ? window.outerHeight : document.documentElement.clientHeight - 22,
              targetWidth = mobile() ? null : w,
              targetHeight = mobile() ? null : h,
              V = screenX < 0 ? window.screen.width + screenX : screenX,
              left = parseInt(V + (outerWidth - targetWidth) / 2, 10),
              right = parseInt(screenY + (outerHeight - targetHeight) / 2.5, 10),
              features = [];
      if (targetWidth !== null) {
        features.push('width=' + targetWidth);
      }
      if (targetHeight !== null) {
        features.push('height=' + targetHeight);
      }
      features.push('left=' + left);
      features.push('top=' + right);
      features.push('scrollbars=1');
      //console.log(features)
      //url = 'http://pc.pulipuli.info:443/demo-articles/test-lorem-ipsum-1section.html'
      
      var newWindow = window.open('', title, features.join(','))
      window.nw = newWindow

      newWindow.document.body.addEventListener('DOMContentLoaded', () => {
        console.log('go')
      })
      //console.log(documentTitle)
      //newWindow.document.write(`<iframe src="${url}" frameborder="0" style="width: 100vw; height: 100vh"></iframe>`)
      newWindow.document.write(`<script>window.moveTo(${left}, ${right});window.resizeTo(${targetWidth}, ${targetHeight})</script>`)
      newWindow.document.write(`<script>location.href="${url}"</script>`)
      /*
      setTimeout(() => {
        //console.log(newWindow.screenX)
        if (newWindow.screenX === 0) {
          console.log({
            left,
            right,
            targetWidth,
            targetHeight
          })
          //newWindow.moveTo(left, right)
          newWindow.resizeTo(targetWidth, targetHeight)
        }
      }, 100)
      */
      //newWindow.document.body.style.margin = 0
      //newWindow.document.title = documentTitle

      if (window.focus) {
        newWindow.focus()
      }
    },
    focus() {
      this.$refs.input.focus()
    }
  } // methods
}

import computedResourceSearch from './computedResourceSearch.js'
computedResourceSearch(ResourceSearch)

export default ResourceSearch