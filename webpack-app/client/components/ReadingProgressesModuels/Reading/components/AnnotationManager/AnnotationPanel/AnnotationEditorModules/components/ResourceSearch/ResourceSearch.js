let ResourceSearch = {
  props: ['lib', 'status', 'config', 'propSelectIndex', 'propAnchorText'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      selectIndex: this.propSelectIndex,
      anchorText: this.propAnchorText
    }
  },
//  components: {
//  },
  computed: {
    resources() {
      return this.status.readingConfig.annotationTypeModules['ConfusedClarified'].externalResourceSearches
    },
    computedButtonClass() {
      let i = this.selectIndex
      if (i === null || i === undefined) {
        return 'disabled'
      }

      if (isNaN(i) === false && typeof (i) === 'string') {
        i = parseInt(i, 10)
      }
      if (!(i > -1 && i < this.resources.length)) {
        return 'disabled'
      }
    },
    selectIndexInteger() {
      let i = this.selectIndex
      if (i === null || i === undefined) {
        return null
      }

      if (isNaN(i) === false && typeof (i) === 'string') {
        i = parseInt(i, 10)
      }
      if (i > -1 && i < this.resources.length) {
        return i
      } else {
        return null
      }
    },
    urlPattern() {
      if (this.selectIndexInteger === null) {
        return null
      }

      return this.resources[this.selectIndexInteger].urlPattern
    }
  },
  watch: {
    propSelectIndex (propSelectIndex) {
      this.selectIndex = propSelectIndex
    },
    propAnchorText (propAnchorText) {
      this.anchorText = propAnchorText
    } 
  },
//  mounted() {
//  },
  methods: {
    doSearch() {
      if (this.urlPattern === null) {
        return false
      }
      let url = this.urlPattern.replace('{anchorText}', this.anchorText)

      //window.open(url, '_blank')
      //window.open(url, windowname, "resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, width=" + w + ", height=" + h + ", left=" + x + ", top=" + y)
      
      let ratio = 0.8
      
      
      this._popupCenter(url, '_blank', screen.availWidth * ratio, screen.availHeight * ratio)
    },
    _popupCenter: function (url, title, w, h) {
      var userAgent = navigator.userAgent,
      mobile = function() {
        return /\b(iPhone|iP[ao]d)/.test(userAgent) ||
          /\b(iP[ao]d)/.test(userAgent) ||
          /Android/i.test(userAgent) ||
          /Mobile/i.test(userAgent);
      },
      screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
      screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
      outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.documentElement.clientWidth,
      outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : document.documentElement.clientHeight - 22,
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

  var newWindow = window.open(url, title, features.join(','));

  if (window.focus) {
    newWindow.focus();
  }
    }
  } // methods
}

export default ResourceSearch