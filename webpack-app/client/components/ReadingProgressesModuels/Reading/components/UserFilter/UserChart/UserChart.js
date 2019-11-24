//import WordCloud from 'wordcloud'
import $ from 'jquery'
import './jQCloud/jqcloud.webpage.js'

import UserChartPopup from './UserChartPopup/UserChartPopup.vue'
import UserChartLables from './UserChartLables/UserChartLables.vue'

let UserChart = {
  props: ['lib', 'status', 'config'
    , 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      jQCloudOptions: {
        autoResize: true
      },
      //allArray: null,
      otherArrayMap: {},
    }
  },
  components: {
    'user-chart-popup': UserChartPopup,
    'user-chart-labels': UserChartLables
  },
  computed: {
    otherIsAll () {
      return (!this.filterData.selectUser)
    },
    otherIsMe () {
      return (this.filterData.selectUser
              && this.filterData.selectUser.id === this.status.userID)
    },
    userWordsTextArray () {
      if (this.filterData.chart.user === null) {
        return []
      }
      return Object.keys(this.filterData.chart.user)
    },
    allWords () {
      let words = this.filterData.chart.allJSON
      return this._processWordFrequency(words)
    },
    userWords() {
      let words = this.filterData.chart.userJSON
      return this._processWordFrequency(words)
    },
    jQCloudWords () {
      let words
      if (this.otherIsAll) {
        // 先看看有沒有暫存
        return this.allWords
      }
      else if (this.otherIsMe) {
        return this.userWords()
      }
      else {
        let userID = this.filterData.selectUser.id
        if (Array.isArray(this.otherArrayMap[userID])) {
          return this.otherArrayMap[userID]
        }
        
        let words = this.filterData.chart.otherJSONMap[userID]
        this.otherArrayMap[userID] = this._processWordFrequency(words)
        return this.otherArrayMap[userID]
      }
    }
  },
  watch: {
    'filterData.selectUser' () {
      this.load()
    }
  },
  mounted() {
    //this._testjQCloud()
  },
  methods: {
    loadInit: async function () {
      this.filterData.chart.userJSON = null
      this.filterData.chart.allJSON = null
      this.filterData.chart.othersJSONMap = null
      
      // 載入
      let data = {}
      if (this.filterData.selectUser) {
        data.userID = this.filterData.selectUser.id
      }
      
      let url = '/client/UserFilter/initUserChart'
      this._loadWords(url)
    },
    load: async function () {
      
      // 這邊要先偵測快取
      if (this.otherIsMe) {
        return null
      }
      else if (this.otherIsAll && this.filterData.chart.allJSON) {
        return null
      }
      else {
        let userID = this.filterData.selectUser.id
        if (this.filterData.chart.othersJSONMap[userID]) {
          return null
        }
      }
      
      // --------------------------
      
      let url = '/client/UserFilter/getUserWords'
      this._loadWords(url)
    },
    _loadWords (url) {
      let data = {}
      if (this.filterData.selectUser) {
        data.userID = this.filterData.selectUser.id
      }
      
      let result = await this.lib.AxiosHelper(, data)
      this.filterData.chart.userJSON = result.userJSON
      if (this.filterData.selectUser) {
        if (!this.filterData.chart.othersJSONMap) {
          this.filterData.chart.othersJSONMap = {}
        }
        this.filterData.chart.othersJSONMap[data.userID] = result.otherJSON
      }
      else {
        this.filterData.chart.allJSON = result.allJSON
      }
      
      // 畫
      $(this.$refs.jQCloudContainer).jQCloud(this.jQCloudWords, this.jQCloudOptions)
    }
    // ---------------------------------
    
    _processWordFrequency (words) {
      let initPopup = this.$refs.UserChartPopup.initPopup
      return Object.keys(words).forEach(text => {
        let item = {
          text
        }
        item.weight = words[text]
        if (this.userWordsTextArray.indexOf(text) > -1) {
          item.color = '#690'
        }
        
        item.handlers = {
          mouseover: function () {
            initPopup(this)
          },
          click: function () {
            initPopup(this)
          }
        }
        return item
      })
    },
    
    // ---------------------------------------------------------
    
    _testjQCloud: async function () {
      await this.lib.VueHelper.sleep(2000)
      
      let popupEle = $(this.$refs.popup)
      
      let inited = false
      
      var words = [
        {text: "Lorem", weight: 13},
        {text: "Ipsum", weight: 10.5},
        {text: "Dolor", weight: 9.4, color: 'red',
        handlers: {
          mouseover: function () {
            if (inited === true) {
              return
            }
            //console.log(this)
            console.log(this.innerText.trim())
            $(this)
              .popup({
                popup: popupEle,
                hoverable: true
            })
            inited = true
          }
        }},
        {text: "Sit", weight: 8},
        {text: "Amet", weight: 6.2},
        {text: "Consectetur", weight: 5},
        {text: "Adipiscing", weight: 5},
        /* ... */
      ];

      $(this.$refs.jQCloudContainer).jQCloud(words, {
        autoResize: true
//        colors: function (i) {
//          console.log(i)
//          return '#F00'
//          if (words[i].text === 'Dolor') {
//            return '#F00'
//          }
//          else {
//            return 'black'
//          }
//        }
      });
      
      await this.lib.VueHelper.sleep(3000)
      
      ///$(this.$refs.jQCloudContainer).jQCloud(words, 'update');
    },
    
//    _mockupData () {
//      
//    },
//    onPopupClick () {
//      console.log('搜尋')
//    }
  } // methods
}

export default UserChart