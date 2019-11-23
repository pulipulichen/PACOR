import WordCloud from 'wordcloud'

let UserChart = {
  props: ['lib', 'status', 'config', 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      user: null,
      others: null
    }
  },
//  components: {
//  },
//  computed: {
//  },
  watch: {
    'filterData.selectUser' () {
      this.load()
    }
  },
  mounted() {
    WordCloud(this.$refs.canvas, {
      list: [['foo', 12], ['bar', 6]]
    })
  },
  methods: {
    loadInit: async function () {
      console.log('讀取')
      this.user = null
      this.others = null
    },
    load: async function () {
      console.log('讀取')
    },
    _mockupData () {
      
    }
  } // methods
}

export default UserChart