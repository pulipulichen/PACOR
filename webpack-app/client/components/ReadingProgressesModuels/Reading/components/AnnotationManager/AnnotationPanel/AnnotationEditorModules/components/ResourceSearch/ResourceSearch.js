let ResourceSearch = {
  props: ['lib', 'status', 'config', 'propSelectIndex', 'anchorText'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      selectIndex: this.propSelectIndex
    }
  },
//  components: {
//  },
  computed: {
    resourses() {
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
      this._popupCenter(url, '_blank', 800, 600)
    },
    _popupCenter: function (url, title, w, h) {
      // Fixes dual-screen position                         Most browsers      Firefox
      var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
      var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

      var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

      var systemZoom = width / window.screen.availWidth;
      var left = (width - w) / 2 / systemZoom + dualScreenLeft
      var top = (height - h) / 2 / systemZoom + dualScreenTop
      var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);

      // Puts focus on the newWindow
      if (window.focus) {
        newWindow.focus();
      }
    }
  } // methods
}

export default ResourceSearch