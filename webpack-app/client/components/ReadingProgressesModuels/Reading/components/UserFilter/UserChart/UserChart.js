let UserChart = {
  props: ['lib', 'status', 'config', 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
    'filterData.selectUser' () {
      this.load()
    }
  },
  mounted() {
  },
  methods: {
    loadInit: async function () {
      console.log('讀取')
    },
    load: async function () {
      console.log('讀取')
    },
    _mockupData () {
      
    }
  } // methods
}

export default UserChart