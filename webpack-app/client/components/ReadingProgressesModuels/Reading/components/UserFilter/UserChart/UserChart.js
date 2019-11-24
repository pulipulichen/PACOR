import WordCloud from 'wordcloud'
import $ from 'jquery'
import './jQCloud/jqcloud.webpage.js'

let UserChart = {
  props: ['lib', 'status', 'config', 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      user: null,
      userWords: [],
      all: null,
      others: null,
      popupMy: 0,
      popupOther: 0,
    }
  },
//  components: {
//  },
  computed: {
    myAvatar () {
      return this.status.avatar
    },
    myUsername () {
      let user = this.status
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    otherAvatar () {
      return this.filterData.selectUser.avatar_url
    },
    otherUsername () {
      let user = this.filterData.selectUser
      if (typeof(user.display_name) === 'string') {
        return user.display_name
      }
      else {
        return user.username
      }
    }
  },
  watch: {
    'filterData.selectUser' () {
      this.load()
    }
  },
  mounted() {
    
    this._testjQCloud()
  },
  methods: {
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
    loadInit: async function () {
      this.user = null
      this.userWords = []
      this.others = null
      this.all = null
      
      
    },
    _processWordFrequency (words) {
      if (this.userWords.length === 0
            && this.user !== null) {
        this.userWords = Object.keys(this.user)
      }
      
      let _this = this
      words = Object.keys(words).forEach(text => {
        let item = {
          text
        }
        item.weight = words[text]
        if (this.userWords.indexOf(text) > -1) {
          item.color = '#690'
        }
        
        item.handlers = {
          mouseover: function () {
            _this._initPopup(this)
          },
          click: function () {
            _this._initPopup(this)
          }
        }
        return item
      })
    },
    _initPopup: function (ele) {
      let text = ele.innerText.trim()
      
      let myFrequency = this.user[text]
      let otherFrequency = this.user[text]
    },
    load: async function () {
      console.log('讀取')
    },
    _mockupData () {
      
    },
    onPopupClick () {
      console.log('搜尋')
    }
  } // methods
}

export default UserChart