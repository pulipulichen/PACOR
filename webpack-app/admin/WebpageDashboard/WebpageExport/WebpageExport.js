import WepbageDashboardSubHeader from './../components/WepbageDashboardSubHeader/WepbageDashboardSubHeader.vue'

let WebpageExport = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      groupIndicators: []
    }
  },
  components: {
    WepbageDashboardSubHeader
  },
  computed: {
    exportAllData () {
      return '/admin/WebpageExport/allData?webpageID=' + this.$route.params.webpageID
    },
    groupIndicatorsTSV () {
      let keys = []
      
      this.groupIndicators.forEach(group => {
        let groupKeys = Object.keys(group)
        
        groupKeys.forEach(key => {
          if (keys.indexOf(key) === -1) {
            keys.push(key)
          }
        })
      })
      
      // --------------------------------
      
      let lines = [
        keys.join('\t')
      ]
      
      this.groupIndicators.forEach(group => {
        let line = keys.map(key => {
          return group[key]
        }).join('\t')
        lines.push(line)
      })
      
      return lines.join('\n')
      //return ''
    }
  },
//  watch: {
//  },
  mounted() {
    this.loadGroupIndicators()
  },
  methods: {
    attrHeaderID: function (anchor) {
      return '/webpage-dashboard/' + this.$route.params.webpageID + '/' + anchor
    },
    loadGroupIndicators: async function () {
      this.groupIndicators = []
      
      let data = {
        webpageID: this.$route.params.webpageID
      }
      
      let result = await this.lib.AxiosHelper.get('/admin/WebpageExport/groupIndicators', data)
      //console.log(result)
      if (Array.isArray(result)) {
        this.groupIndicators = result
      }
    },
    copyGroupIndicatorsTSV () {
      this.lib.ClipboardHelper.copy(this.groupIndicatorsTSV)
    }
  } // methods
}

export default WebpageExport