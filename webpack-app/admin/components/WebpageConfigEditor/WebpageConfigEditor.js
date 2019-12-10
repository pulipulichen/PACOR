let WebpageConfigEditor = {
  props: ['lib', 'status', 'config'
            , 'webpage'],
  data() {
    this.$i18n.locale = this.config.locale
    
    //console.log(this.webpage.config)
    let configString = ''
    if (this.webpage.config) {
      configString = JSON.stringify(this.webpage.config, null, 2)
    }
    
    return {
      editingConfig: this.webpage,
      configString
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

      
      try {
        //data.config = JSON.parse(webpage.config)
        eval(`data.config = ${this.configString}`)
      } 
      catch (e) {
        console.log(e)
      }
      
      console.log(data)

      if (typeof (data.config) !== 'object'
              && data.config) {
        return false
      }


      await this.lib.AxiosHelper.post('/Admin/Webpage/editConfig', data)

      // 關閉Modal
      //console.log(data)
      webpage.config = data.config
      this.$emit('change', webpage)
    }
  } // methods
}

export default WebpageConfigEditor