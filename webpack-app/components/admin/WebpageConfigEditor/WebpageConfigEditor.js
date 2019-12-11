let WebpageConfigEditor = {
  props: ['lib', 'status', 'config'
            , 'webpage', 'buttonMode', 'showLabel'],
  data() {
    this.$i18n.locale = this.config.locale
    
    //console.log(this.webpage.config)
    let configString = ''
    if (this.webpage 
            && this.webpage.config) {
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
    },
    uri () {
      if (this.webpage.url) {
        return '/' + this.webpage.url.split('/').slice(3).join('/')
      }
    },
    computedButtonTitle () {
      let title = [
        this.$t('Edit config of')
        , '# ' + this.webpage.id
        , this.uri
      ]
      
      if (this.title) {
        title.push(this.title)
      }
      
      return title.join(' ').trim()
    },
    computedButtonClassList () {
      if (this.buttonMode === false) {
        return
      }
      else {
        return 'ui icon button'
      }
    }
  },
  watch: {
    webpage (webpage) {
      
      let configString = ''
      if (webpage 
              && webpage.config) {
        configString = JSON.stringify(webpage.config, null, 2)
      }
      
      this.editingConfig = webpage,
      this.configString = configString
    }
  },
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