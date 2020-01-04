let RemoteConsoleLog = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      logs: [],
      afterTime: null,
      intervalSeconds: 5000
    }
  },
//  components: {
//  },
//  computed: {
//  },
//  watch: {
//  },
  mounted() {
    this.load()
  },
  methods: {
    load: async function () {
      let logs = await this.lib.AxiosHelper.get('/admin/Log/get', {
        afterTime: this.afterTime
      })
      
      console.log(logs)
      logs.reverse()
      this.logs = this.logs.concat(logs)
      
      this.afterTime = (new Date()).getTime()
      
      await this.lib.VueHelper.sleep(this.intervalSeconds * 1000)
      this.load()
    }
  } // methods
}

export default RemoteConsoleLog