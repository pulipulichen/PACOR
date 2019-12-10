let WebpageConfigEditor = {
  props: ['lib', 'status', 'config'
            , 'webpage'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      editingConfig: this.webpage
    }
  },
//  components: {
//  },
  computed: {
    title () {
      if (this.webpage.title !== '' 
              && this.webpage.title) {
        return '(' + this.webpage.title + ')'
      }
    }
      
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    editConfigOpen: function () {
      this.$refs.ModelEditConfig.show()
    },
    editConfigSubmit: async function () {
      this.$refs.ModelEditConfig.hide()

      let webpage = this.editingConfig
      let data = {
        id: webpage.id
      }

      if (webpage.config !== '') {
        try {
          data.config = JSON.parse(webpage.config)
        } catch (e) {
        }
      } else {
        data.config = null
      }

      if (typeof (data.config) === 'undefined') {
        return false
      }

      await this.lib.AxiosHelper.post('/Admin/Webpage/editConfig', data)

      // 關閉Modal
      this.$emit('change', webpage)
    }
  } // methods
}

export default WebpageConfigEditor