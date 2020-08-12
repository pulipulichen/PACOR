import WepbageDashboardSubHeader from './../components/WepbageDashboardSubHeader/WepbageDashboardSubHeader.vue'

let WebpageExport = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      groupIndicators: [],
      
      // 要挑那些組別，請看這裡
      // https://drive.google.com/drive/u/0/folders/17_P9Lm20Vx2_NA9lbWf4Fw3NeRefYSoe
      targetGroups: [
        'nn1 nn12 nn27 nn4 nn9',
        'nn11 nn20 nn22 nn7',
      ],
      excludeGroups: [
        'nn23 nn25 nn999'
      ]
    }
  },
  components: {
    WepbageDashboardSubHeader
  },
  computed: {
    exportAllData () {
      return '/admin/WebpageExport/allData?webpageID=' + this.$route.params.webpageID
    },
    groupIndicatorsKeys () {
      let keys = []
      
      this.groupIndicators.forEach(group => {
        let groupKeys = Object.keys(group)
        
        groupKeys.forEach(key => {
          if (keys.indexOf(key) === -1) {
            keys.push(key)
          }
        })
      })
      
      return keys
    },
    groupIndicatorsTSV () {
      let keys = this.groupIndicatorsKeys
      
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
    },
    groupIndicatorsEMMTSV () {
      let keys = ['model'].concat(this.groupIndicatorsKeys)
      
      // --------------------------------
      
      let lines = [
        keys.join('\t')
      ]
      
      this.groupIndicators.forEach(group => {
        if (this.excludeGroups.indexOf(group.users) > -1) {
          return false
        }
        
        let line = keys.map(key => {
          return group[key]
        }).join('\t')
        lines.push(1 + line)
      })
      
      this.groupIndicators.forEach(group => {
        if (this.targetGroups.indexOf(group.users) === -1) {
          return false
        }
        
        let line = keys.map(key => {
          return group[key]
        }).join('\t')
        lines.push(2 + line)
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
  } // methods
}

export default WebpageExport